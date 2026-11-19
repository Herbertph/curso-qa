export function initAccordion(root) {
  const triggers = Array.from(root.querySelectorAll('.acc-trigger'));

  function setOpen(trigger, open) {
    trigger.setAttribute('aria-expanded', String(open));
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (panel) panel.hidden = !open;
  }

  triggers.forEach((trigger) => {
    setOpen(trigger, trigger.getAttribute('aria-expanded') === 'true');
    trigger.addEventListener('click', () => {
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      triggers.forEach((other) => setOpen(other, other === trigger ? willOpen : false));
    });
  });
}
