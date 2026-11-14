const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = header?.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = header?.querySelector<HTMLElement>('#main-navigation');
if (header && toggle && nav) {
  const narrow = matchMedia('(max-width: 1023px)');
  const label = toggle.querySelector('[data-menu-label]');
  const products = nav.querySelector<HTMLDetailsElement>(
    '.products-disclosure',
  );
  const summary = products?.querySelector('summary');
  const panel = products?.querySelector<HTMLElement>('.products-dropdown');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let panelAnimation: Animation | undefined;
  const cancelPanelAnimation = () => {
    panelAnimation?.cancel();
    panelAnimation = undefined;
  };
  const animatePanel = (opening: boolean) => {
    cancelPanelAnimation();
    if (narrow.matches || reducedMotion.matches || !panel?.animate) return;
    const hidden = { opacity: 0, transform: 'translateY(-8px)' };
    const visible = { opacity: 1, transform: 'translateY(0)' };
    panelAnimation = panel.animate(
      opening ? [hidden, visible] : [visible, hidden],
      {
        duration: 200,
        easing: 'ease-in-out',
        fill: 'both',
      },
    );
    return panelAnimation;
  };
  const background = [
    ...document.querySelectorAll<HTMLElement>(
      '#main, .site-footer, .skip-link',
    ),
  ];
  const previousInert = new Map<HTMLElement, boolean>();
  const hoverNavigation = matchMedia(
    '(min-width: 1024px) and (hover: hover) and (pointer: fine)',
  );
  let hoverCloseTimer: number | undefined;
  const cancelHoverClose = () => {
    clearTimeout(hoverCloseTimer);
    hoverCloseTimer = undefined;
  };
  let lastScrollY = Math.max(0, scrollY);
  let scrollFrame = 0;
  let scrollDirection = 0;
  let scrollDistance = 0;
  const showHeader = () => {
    header.dataset.scrollHidden = 'false';
    scrollDistance = 0;
  };
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  const updateHeader = () => {
    scrollFrame = 0;
    const maximum = Math.max(
      0,
      document.documentElement.scrollHeight - innerHeight,
    );
    const y = Math.min(Math.max(0, scrollY), maximum);
    const delta = y - lastScrollY;
    lastScrollY = y;
    if (
      y <= 96 ||
      isOpen() ||
      products?.open ||
      header.querySelector(':focus-visible')
    ) {
      showHeader();
      return;
    }
    if (Math.abs(delta) < 1) return;
    const direction = Math.sign(delta);
    if (direction !== scrollDirection) scrollDistance = 0;
    scrollDirection = direction;
    scrollDistance += Math.abs(delta);
    if (scrollDistance >= 12) {
      header.dataset.scrollHidden = String(direction > 0);
      scrollDistance = 0;
    }
  };
  addEventListener(
    'scroll',
    () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateHeader);
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => {
    cancelPanelAnimation();
    showHeader();
  });
  const closeProducts = (restore = false, animate = false) => {
    cancelHoverClose();
    if (!products) return;
    const animation =
      animate && products.open ? animatePanel(false) : undefined;
    if (animation) {
      animation.onfinish = () => closeProducts();
      return;
    }
    cancelPanelAnimation();
    products.open = false;
    summary?.setAttribute('aria-expanded', 'false');
    if (restore) summary?.focus();
  };
  const openProducts = () => {
    cancelHoverClose();
    cancelPanelAnimation();
    if (products) products.open = true;
    showHeader();
  };
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) cancelPanelAnimation();
  });
  const setOpen = (open: boolean, restore = false) => {
    showHeader();
    lastScrollY = Math.max(0, scrollY);
    toggle.setAttribute('aria-expanded', String(open));
    header.dataset.open = String(open);
    document.documentElement.toggleAttribute('data-menu-open', open);
    if (label) label.textContent = open ? 'Close menu' : 'Menu';
    if (open) {
      for (const element of background) {
        previousInert.set(element, element.inert);
        element.inert = true;
      }
    } else {
      for (const [element, inert] of previousInert) element.inert = inert;
      previousInert.clear();
      closeProducts();
    }
    if (restore) toggle.focus();
  };
  const configure = () => {
    const restore = isOpen() && header.contains(document.activeElement);
    setOpen(false);
    toggle.hidden = !narrow.matches;
    header.dataset.enhanced = 'true';
    if (restore)
      (narrow.matches
        ? toggle
        : header.querySelector<HTMLAnchorElement>('.wordmark')
      )?.focus();
  };
  configure();
  narrow.addEventListener('change', configure);
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  products?.addEventListener('pointerenter', (event) => {
    if (!hoverNavigation.matches || event.pointerType === 'touch') return;
    openProducts();
  });
  summary?.addEventListener('click', (event) => {
    if (hoverNavigation.matches && event.detail > 0 && products) {
      event.preventDefault();
      openProducts();
    }
  });
  header.addEventListener('pointerenter', () => {
    cancelHoverClose();
    cancelPanelAnimation();
  });
  header.addEventListener('pointerleave', () => {
    if (!hoverNavigation.matches) return;
    cancelHoverClose();
    hoverCloseTimer = window.setTimeout(() => {
      if (!products?.querySelector(':focus-visible'))
        closeProducts(false, true);
    }, 150);
  });
  for (const link of header.querySelectorAll(
    '.main-navigation > a, .header-inner > .wordmark',
  )) {
    link.addEventListener('pointerenter', () => {
      if (hoverNavigation.matches) closeProducts(false, true);
    });
  }
  products?.addEventListener('toggle', () => {
    summary?.setAttribute('aria-expanded', String(products.open));
    if (products.open) {
      showHeader();
      animatePanel(true);
    } else cancelPanelAnimation();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (products?.open) {
        event.preventDefault();
        closeProducts(true);
      } else if (isOpen()) {
        event.preventDefault();
        setOpen(false, true);
      }
    }
    if (event.key === 'Tab' && isOpen()) {
      const focusable = [
        ...header.querySelectorAll<HTMLElement>('a, button, summary'),
      ].filter(
        (el) =>
          el.getClientRects().length > 0 &&
          getComputedStyle(el).visibility !== 'hidden',
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });
  nav.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!header.contains(event.target as Node)) closeProducts();
  });
  header.addEventListener('focusout', (event) => {
    if (!isOpen() && !header.contains(event.relatedTarget as Node))
      closeProducts();
  });
  addEventListener('pagehide', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    setOpen(false);
  });
  addEventListener('pageshow', (event) => {
    if (event.persisted) configure();
  });
}
