export function createModal(root, { onOpen } = {}) {
  const closeButton = root.querySelector('.modal-close');
  let lastFocused = null;
  let open = false;

  function show() {
    if (open) return;
    open = true;
    lastFocused = document.activeElement;
    root.classList.add('open');
    document.body.classList.add('modal-open');
    if (onOpen) onOpen();
    closeButton.focus();
  }

  function close() {
    if (!open) return;
    open = false;
    root.classList.remove('open');
    document.body.classList.remove('modal-open');
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  closeButton.addEventListener('click', close);

  root.addEventListener('click', (event) => {
    if (event.target === root) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) close();
  });

  return {
    open: show,
    close,
    isOpen: () => open,
  };
}
