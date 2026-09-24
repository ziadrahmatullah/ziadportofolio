"use client";

import dynamic from "next/dynamic";

// Three.js needs the browser; skip SSR for the whole scene.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function SceneLoader() {
  return <Scene />;
}
