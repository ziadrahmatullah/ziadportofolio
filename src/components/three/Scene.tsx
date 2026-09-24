"use client";

import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { NeuralNetwork } from "./NeuralNetwork";
import { StarField } from "./StarField";
import { Effects } from "./Effects";
import { installInputListeners } from "./pointer";

/** Swallows WebGL failures so the page still renders on a CSS background. */
class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** This component is only ever rendered in the browser (see SceneLoader). */
function initialNodeCount() {
  if (typeof window === "undefined") return 120;
  return window.innerWidth < 768 ? 72 : 120;
}

export default function Scene() {
  const [ready, setReady] = useState(false);
  const [nodeCount] = useState(initialNodeCount);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => installInputListeners(), []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <CanvasErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 11], fov: 45, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          onCreated={() => setReady(true)}
        >
          <color attach="background" args={["#05070d"]} />
          <fog attach="fog" args={["#05070d", 10, 30]} />
          <Suspense fallback={null}>
            <StarField reducedMotion={reducedMotion} />
            <NeuralNetwork
              count={nodeCount}
              pulseCount={nodeCount < 100 ? 22 : 36}
              reducedMotion={reducedMotion}
            />
            <Effects />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
