import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export function enhanceScrolling() {
  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.14,
    smoothWheel: true,
    syncTouch: false,
    anchors: false,
  });
  // Keep native anchor focus, URL/history and scroll-margin handling. Lenis only
  // interpolates eligible desktop wheel input; it never intercepts keyboard input.
  const reset = () =>
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
  addEventListener('hashchange', reset);
  addEventListener('popstate', reset);
  return () => {
    removeEventListener('hashchange', reset);
    removeEventListener('popstate', reset);
    lenis.destroy();
  };
}
