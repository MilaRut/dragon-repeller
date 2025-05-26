const hintsBtns = document.querySelectorAll('.hints__btn');
const closeHint = document.querySelector('.close-hint');
const hintsDisplayBtns = document.querySelectorAll('.hints-display__btn');
const hints = document.querySelectorAll('.hints-display__texts span');

function hideAll(el, className) {
  if (el.classList.contains(className)) {
    el.classList.remove(className);
  }
}

function toggleHints() {
  hintsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.hints').classList.remove('active');
      if (btn.classList.contains('hints__btn--yes')) {
        document.querySelector('.hints-display').classList.add('active');
      }
    });
  });

  closeHint.addEventListener('click', () => {
    document.querySelector('.hints-display').classList.remove('active');
    hintsDisplayBtns.forEach((btn) => {
      hideAll(btn, 'hidden')
    });
    hints.forEach((hint) => {
      hideAll(hint, 'active')
    });
  });

  hintsDisplayBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      hints.forEach((hint) => {
        hideAll(hint, 'active')
      });
      const hintId = btn.getAttribute('data-id');
      const currentHint = document.querySelector(hintId);
      currentHint.classList.add('active');
      btn.classList.add('hidden');
    });
  });
}

export { toggleHints };