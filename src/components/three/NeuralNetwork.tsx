"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { buildGraph, mulberry32, type Graph } from "./graph";
import { input } from "./pointer";

const CYAN = new THREE.Color("#22d3ee");
const VIOLET = new THREE.Color("#a78bfa");

const tmpObj = new THREE.Object3D();
const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();

type Pulse = { edge: number; t: number; speed: number; forward: boolean };

type AnimState = {
  phases: Float32Array;
  speeds: Float32Array;
  glow: Float32Array;
  pulses: Pulse[];
};

function createAnimState(graph: Graph, pulseCount: number): AnimState {
  const rand = mulberry32(99);
  const phases = new Float32Array(graph.count);
  const speeds = new Float32Array(graph.count);
  const glow = new Float32Array(graph.count);
  for (let i = 0; i < graph.count; i++) {
    phases[i] = rand() * Math.PI * 2;
    speeds[i] = 0.8 + rand() * 1.2;
  }
  const pulses: Pulse[] = Array.from({ length: pulseCount }, () => ({
    edge: Math.floor(rand() * graph.edgeCount),
    t: rand(),
    speed: 0.35 + rand() * 0.5,
    forward: rand() > 0.5,
  }));
  return { phases, speeds, glow, pulses };
}

function buildEdgeGeometry(graph: Graph): THREE.BufferGeometry {
  const arr = new Float32Array(graph.edgeCount * 6);
  for (let e = 0; e < graph.edgeCount; e++) {
    const a = graph.edges[e * 2];
    const b = graph.edges[e * 2 + 1];
    arr[e * 6] = graph.positions[a * 3];
    arr[e * 6 + 1] = graph.positions[a * 3 + 1];
    arr[e * 6 + 2] = graph.positions[a * 3 + 2];
    arr[e * 6 + 3] = graph.positions[b * 3];
    arr[e * 6 + 4] = graph.positions[b * 3 + 1];
    arr[e * 6 + 5] = graph.positions[b * 3 + 2];
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  return g;
}

type Props = {
  count?: number;
  pulseCount?: number;
  reducedMotion?: boolean;
};

/**
 * A glowing 3D graph: nodes pulse gently, and bright "signals" travel along
 * the edges, lighting up each node they reach. The whole group slowly spins,
 * tilts toward the pointer, and drifts/dims as the page scrolls.
 */
export function NeuralNetwork({
  count = 120,
  pulseCount = 36,
  reducedMotion = false,
}: Props) {
  const graph = useMemo(() => buildGraph(count), [count]);
  const edgeGeometry = useMemo(() => buildEdgeGeometry(graph), [graph]);
  const { size } = useThree();

  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const pulsesRef = useRef<THREE.InstancedMesh>(null);
  const nodeMat = useRef<THREE.MeshBasicMaterial>(null);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null);
  const pulseMat = useRef<THREE.MeshBasicMaterial>(null);
  // Mutable per-frame animation state lives in a ref, never in render state.
  const animRef = useRef<AnimState | null>(null);

  useEffect(() => () => edgeGeometry.dispose(), [edgeGeometry]);

  useEffect(() => {
    animRef.current = createAnimState(graph, pulseCount);
  }, [graph, pulseCount]);

  // One-time instance setup: colours and initial matrices.
  useEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    for (let i = 0; i < graph.count; i++) {
      mesh.setColorAt(i, i % 4 === 0 ? VIOLET : CYAN);
      tmpObj.position.fromArray(graph.positions, i * 3);
      tmpObj.scale.setScalar(1);
      tmpObj.updateMatrix();
      mesh.setMatrixAt(i, tmpObj.matrix);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
  }, [graph]);

  useFrame((state, rawDt) => {
    const anim = animRef.current;
    if (!anim) return;

    const dt = Math.min(rawDt, 0.05);
    const time = state.clock.elapsedTime;
    const isDesktop = size.width >= 1024;
    const s = input.scroll;
    const { damp, lerp } = THREE.MathUtils;

    if (spinRef.current && !reducedMotion) {
      spinRef.current.rotation.y += dt * 0.08;
    }

    // In the hero the network sits beside the copy; once the page scrolls it
    // retreats to the top-right, shrinks, and fades into an ambient backdrop.
    const tilt = tiltRef.current;
    if (tilt) {
      const targetX = isDesktop ? lerp(3.5, 4.6, s) : lerp(0, 0.8, s);
      const targetY = isDesktop ? lerp(0, 1.4, s) : lerp(0.8, 2.6, s);
      const targetScale = isDesktop ? lerp(0.95, 0.7, s) : lerp(0.85, 0.6, s);
      tilt.position.x = damp(tilt.position.x, targetX, 2.5, dt);
      tilt.position.y = damp(tilt.position.y, targetY, 2.5, dt);
      tilt.scale.setScalar(damp(tilt.scale.x, targetScale, 2.5, dt));
      tilt.rotation.x = damp(tilt.rotation.x, -input.y * 0.18, 3, dt);
      tilt.rotation.z = damp(tilt.rotation.z, input.x * 0.08, 3, dt);
      tilt.rotation.y = damp(tilt.rotation.y, input.x * 0.28, 3, dt);
    }

    const dim = lerp(1, 0.22, s);
    if (nodeMat.current) nodeMat.current.opacity = dim;
    if (edgeMat.current) edgeMat.current.opacity = 0.22 * dim;
    if (pulseMat.current) pulseMat.current.opacity = lerp(1, 0.35, s);

    const { phases, speeds, glow, pulses } = anim;
    const { edges, adjacency, positions } = graph;

    const nodes = nodesRef.current;
    if (nodes) {
      for (let i = 0; i < graph.count; i++) {
        glow[i] = Math.max(0, glow[i] - dt * 2.2);
        const base = reducedMotion
          ? 1
          : 1 + 0.25 * Math.sin(time * speeds[i] + phases[i]);
        tmpObj.position.fromArray(positions, i * 3);
        tmpObj.scale.setScalar(base + glow[i] * 1.2);
        tmpObj.updateMatrix();
        nodes.setMatrixAt(i, tmpObj.matrix);
      }
      nodes.instanceMatrix.needsUpdate = true;
    }

    const pm = pulsesRef.current;
    if (pm) {
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        if (!reducedMotion) p.t += dt * p.speed;
        if (p.t >= 1) {
          const arriveAt = p.forward ? edges[p.edge * 2 + 1] : edges[p.edge * 2];
          glow[arriveAt] = 1;
          const options = adjacency[arriveAt];
          let next = options[Math.floor(Math.random() * options.length)];
          if (options.length > 1 && next === p.edge) {
            next = options[(options.indexOf(next) + 1) % options.length];
          }
          p.edge = next;
          p.forward = edges[next * 2] === arriveAt;
          p.t = 0;
        }
        const a = p.forward ? edges[p.edge * 2] : edges[p.edge * 2 + 1];
        const b = p.forward ? edges[p.edge * 2 + 1] : edges[p.edge * 2];
        tmpA.fromArray(positions, a * 3);
        tmpB.fromArray(positions, b * 3);
        tmpObj.position.lerpVectors(tmpA, tmpB, p.t);
        tmpObj.scale.setScalar(0.5 + Math.sin(p.t * Math.PI) * 0.9);
        tmpObj.updateMatrix();
        pm.setMatrixAt(i, tmpObj.matrix);
      }
      pm.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={tiltRef} position={[3.5, 0, 0]} scale={0.95}>
      <group ref={spinRef}>
        <instancedMesh
          ref={nodesRef}
          args={[undefined, undefined, graph.count]}
          frustumCulled={false}
        >
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshBasicMaterial ref={nodeMat} transparent toneMapped={false} />
        </instancedMesh>

        <lineSegments geometry={edgeGeometry}>
          <lineBasicMaterial
            ref={edgeMat}
            color="#67e8f9"
            transparent
            opacity={0.22}
            depthWrite={false}
            toneMapped={false}
          />
        </lineSegments>

        <instancedMesh
          ref={pulsesRef}
          args={[undefined, undefined, pulseCount]}
          frustumCulled={false}
        >
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshBasicMaterial
            ref={pulseMat}
            color="#e0f7ff"
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </instancedMesh>
      </group>
    </group>
  );
}
