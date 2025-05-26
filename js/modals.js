const modalOpenElements = document.querySelectorAll('[data-open-modal]');
const modalCloseElements = document.querySelectorAll('[data-close-modal]');
const modals = document.querySelectorAll('.modal');

function openModal(modal) {
  modal.classList.add('active');
  setTimeout(() => {
    modal.classList.add('visible');
  }, 500);
}

function closeModal() {
  modals.forEach((el) => {
    el.classList.remove('active', 'visible');
  });
}

function initModal() {
  modalOpenElements.forEach((el) => {
    let currentEl = el;
    let modalId = currentEl.getAttribute('data-modal-id');
    let currentModal = document.querySelector(modalId);
    el.addEventListener('click', (e) => {
      e.preventDefault();
      currentModal.classList.add('active');
      setTimeout(() => {
        currentModal.classList.add('visible');
      }, 500);
    });
  });

  modalCloseElements.forEach((el) => {
    el.addEventListener('click', () => {
      closeModal();
    });
  });

  modals.forEach((modal) => {
    modal.querySelector('.modal__content').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

export { initModal };