/**
 * Shared, mutable input state read by the Three.js scene every frame.
 * Listeners are installed once by <Scene /> and written here to avoid
 * re-rendering React on every pointer move or scroll event.
 */
export const input = {
  /** Pointer X in normalized device coords (-1 .. 1). */
  x: 0,
  /** Pointer Y in normalized device coords (-1 .. 1), up is positive. */
  y: 0,
  /** 0 at the top of the page, 1 once the hero has scrolled out of view. */
  scroll: 0,
};

export function installInputListeners(): () => void {
  if (typeof window === "undefined") return () => {};

  const onMove = (e: PointerEvent) => {
    input.x = (e.clientX / window.innerWidth) * 2 - 1;
    input.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  const onScroll = () => {
    const max = Math.max(1, window.innerHeight * 1.1);
    input.scroll = Math.min(1, Math.max(0, window.scrollY / max));
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("scroll", onScroll);
  };
}
