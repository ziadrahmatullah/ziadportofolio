"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { mulberry32 } from "./graph";

type Props = { count?: number; reducedMotion?: boolean };

/** Faint distant particles that give the scene depth. */
export function StarField({ count = 700, reducedMotion = false }: Props) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const rand = mulberry32(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = rand();
      const v = rand();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 18 + rand() * 22;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, dt) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.y += Math.min(dt, 0.05) * 0.012;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.09}
        sizeAttenuation
        color="#94a3b8"
        transparent
        opacity={0.55}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}
