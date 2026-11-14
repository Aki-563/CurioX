const preference = matchMedia('(prefers-reduced-motion: reduce)');
const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
const seen = new WeakSet<HTMLElement>();
const active = new Map<HTMLElement, Animation>();
let observer: IntersectionObserver | undefined;

function cancelActive() {
  observer?.disconnect();
  for (const animation of active.values()) animation.cancel();
  active.clear();
}

function configureReveals() {
  cancelActive();
  if (
    preference.matches ||
    !('IntersectionObserver' in window) ||
    !Element.prototype.animate
  )
    return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer?.unobserve(element);
        seen.add(element);
        if (element.matches(':focus-within')) continue;
        const group = element.closest('[data-reveal-group]');
        const siblings = group
          ? [...group.querySelectorAll('[data-reveal]')]
          : [element];
        const delay = Math.min(Math.max(siblings.indexOf(element), 0), 3) * 75;
        const blur = matchMedia('(max-width: 1023px)').matches ? 2 : 4;
        try {
          const animation = element.animate(
            [
              {
                opacity: 0,
                filter: `blur(${blur}px)`,
                transform: 'translateY(12px)',
              },
              { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
            ],
            {
              duration: 450,
              delay,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'backwards',
            },
          );
          active.set(element, animation);
          void animation.finished
            .then(() => active.delete(element))
            .catch(() => active.delete(element));
        } catch {
          // Static content is the baseline; an unavailable effect never hides it.
        }
      }
    },
    { threshold: 0.08 },
  );
  for (const target of targets) if (!seen.has(target)) observer.observe(target);
}

document.addEventListener('focusin', (event) => {
  const element = (event.target as Element).closest<HTMLElement>(
    '[data-reveal]',
  );
  if (!element) return;
  active.get(element)?.cancel();
  active.delete(element);
  seen.add(element);
  observer?.unobserve(element);
});
configureReveals();
preference.addEventListener('change', configureReveals);
addEventListener('pagehide', cancelActive);
addEventListener('pageshow', (event) => {
  if (event.persisted) configureReveals();
});
