"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

/** Post-processing: soft bloom for the glowing nodes plus a gentle vignette. */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.9}
        luminanceThreshold={0.25}
        luminanceSmoothing={0.7}
        mipmapBlur
        radius={0.7}
      />
      <Vignette eskil={false} offset={0.15} darkness={0.75} />
    </EffectComposer>
  );
}
