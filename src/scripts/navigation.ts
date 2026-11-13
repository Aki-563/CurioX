const header = document.querySelector<HTMLElement>('[data-header]');
const toggle = header?.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = header?.querySelector<HTMLElement>('#main-navigation');
if (header && toggle && nav) {
  const narrow = matchMedia('(max-width: 767px)');
  const label = toggle.querySelector('[data-menu-label]');
  const setOpen = (open: boolean, restore = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    header.dataset.open = String(open);
    if (label) label.textContent = open ? 'Close menu' : 'Menu';
    if (restore) toggle.focus();
  };
  const configure = () => {
    setOpen(false);
    toggle.hidden = !narrow.matches;
    header.dataset.enhanced = 'true';
  };
  configure();
  narrow.addEventListener('change', configure);
  toggle.addEventListener('click', () =>
    setOpen(toggle.getAttribute('aria-expanded') !== 'true'),
  );
  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      toggle.getAttribute('aria-expanded') === 'true'
    )
      setOpen(false, true);
  });
  nav.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!header.contains(event.target as Node)) setOpen(false);
  });
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget as Node)) setOpen(false);
  });
}
