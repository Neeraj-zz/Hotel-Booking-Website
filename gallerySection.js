document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // click on image functionality 

  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.querySelector('.gallery-lightbox-img');
  const lightboxClose = document.querySelector('.gallery-lightbox-close');
  const lightboxPrev = document.querySelector('.gallery-lightbox-prev');
  const lightboxNext = document.querySelector('.gallery-lightbox-next');
  const lightboxCounter = document.querySelector('.gallery-lightbox-counter');

  let galleryVisibleItems = [];
  let currentIndex = 0;

  function updateVisibleItems() {
    galleryVisibleItems = Array.from(document.querySelectorAll('.gallery-item'))
      .filter(item => item.style.display !== 'none');
  }

  function openLightbox(index) {
    updateVisibleItems();
    currentIndex = index;
    const img = galleryVisibleItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.style.display = 'flex';
    updateCounter();
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  }

  function showPrev() {
    if (galleryVisibleItems.length === 0) return;
    currentIndex = (currentIndex - 1 + galleryVisibleItems.length) % galleryVisibleItems.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    if (galleryVisibleItems.length === 0) return;
    currentIndex = (currentIndex + 1) % galleryVisibleItems.length;
    openLightbox(currentIndex);
  }

  function updateCounter() {
    lightboxCounter.textContent = `${currentIndex + 1} of ${galleryVisibleItems.length}`;
  }

  // for click event to zoom buttons

  document.querySelectorAll('.gallery-zoom-btn').forEach((btn, idx) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      updateVisibleItems();

      // for gallery item 
      const parentItem = btn.closest('.gallery-item');
      const visibleIdx = galleryVisibleItems.indexOf(parentItem);
      if (visibleIdx !== -1) {
        openLightbox(visibleIdx);
      }
    });
  });

  // click even 
  document.querySelectorAll('.gallery-link-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      window.location.href = 'gallery.html';
    });
  });

  // appear of images over imageses is closed by cross 
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // changing 
  lightboxPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    showPrev();
  });
  lightboxNext.addEventListener('click', function (e) {
    e.stopPropagation();
    showNext();
  });

  
  document.addEventListener('keydown', function (e) {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeLightbox();
    }
  });
});

 
document.addEventListener('DOMContentLoaded', function () {
  const mainImg = document.getElementById('single-gallery-main-img');
  const thumbs = document.querySelectorAll('.single-gallery-thumb');
  const nextBtn = document.getElementById('single-gallery-next');
  const images = [
    'images/single/thumb-1.jpg',
    'images/single/thumb-2.jpg',
    'images/single/thumb-3.jpg'
  ];
  const largeImage = 'images/single/large-thumb.jpg';
  let current = 0;

  function updateGallery(index) {
    current = index;
    mainImg.src = images[index] || largeImage;
    thumbs.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  
  updateGallery(0);

  nextBtn && nextBtn.addEventListener('click', function () {
    let next = (current + 1) % images.length;
    updateGallery(next);
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', function () {
      updateGallery(i);
    });
  });
}); 