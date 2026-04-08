

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.rooms-offer-cards');
  const prevBtn = document.querySelector('.rooms-offer-prev');
  const nextBtn = document.querySelector('.rooms-offer-next');

  function slideRight() {
    const first = container.firstElementChild;
    if (first) {
      container.appendChild(first);
    }
  }

  function slideLeft() {
    const last = container.lastElementChild;
    if (last) {
      container.insertBefore(last, container.firstElementChild);
    }
  }

  nextBtn.addEventListener('click', function() {
    slideRight();
  });
  prevBtn.addEventListener('click', function() {
    slideLeft();
  });
});

// image appear on click for offer

(function() {
  const wrappers = Array.from(document.querySelectorAll('.room-offer-img-wrapper'));
  if (!wrappers.length) return;
  let modal = document.getElementById('offer-image-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'offer-image-modal';
    modal.className = 'choose-image-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <span class="choose-modal-close">&times;</span>
      <img class="choose-modal-img" src="" alt="Preview" />
      <div class="choose-modal-nav choose-modal-prev">&#10094;</div>
      <div class="choose-modal-nav choose-modal-next">&#10095;</div>
      <div class="choose-modal-counter"></div>
    `;
    document.body.appendChild(modal);
  }
  const modalImg = modal.querySelector('.choose-modal-img');
  const closeBtn = modal.querySelector('.choose-modal-close');
  const prevBtn = modal.querySelector('.choose-modal-prev');
  const nextBtn = modal.querySelector('.choose-modal-next');
  const counter = modal.querySelector('.choose-modal-counter');
  let current = 0;

  function showModal(idx) {
    current = idx;
    const img = wrappers[current].querySelector('img');
    modalImg.src = img.src;
    counter.textContent = (current+1) + ' of ' + wrappers.length;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  function showNext() {
    showModal((current+1)%wrappers.length);
  }
  function showPrev() {
    showModal((current-1+wrappers.length)%wrappers.length);
  }
  wrappers.forEach((wrap, idx) => {
    wrap.style.cursor = 'pointer';
    wrap.addEventListener('click', e => {
      showModal(idx);
    });
  });
  closeBtn.addEventListener('click', closeModal);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
})(); 