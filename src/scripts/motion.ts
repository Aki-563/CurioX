const eligibility = matchMedia(
  '(min-width: 1024px) and (pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)',
);
let dispose: (() => void) | undefined;
let generation = 0;

async function updateScrolling() {
  const current = ++generation;
  dispose?.();
  dispose = undefined;
  document.documentElement.dataset.scroll = 'native';
  if (
    !eligibility.matches ||
    navigator.maxTouchPoints > 0 ||
    new URLSearchParams(location.search).get('scroll') === 'native'
  )
    return;
  try {
    const { enhanceScrolling } = await import('./smooth-scroll');
    if (current !== generation || !eligibility.matches) return;
    dispose = enhanceScrolling();
    document.documentElement.dataset.scroll = 'smooth';
  } catch {
    // Enhancement failure leaves native scrolling and visible content intact.
  }
}

void updateScrolling();
eligibility.addEventListener('change', () => void updateScrolling());
addEventListener('pagehide', () => {
  generation++;
  dispose?.();
  dispose = undefined;
});
addEventListener('pageshow', (event) => {
  if (event.persisted) void updateScrolling();
});
