/** Lightweight CSS-only backdrop for sub-pages that do not load the 3D scene. */
export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute left-[-10%] top-1/2 h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-3xl" />
    </div>
  );
}
