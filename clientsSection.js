document.addEventListener('DOMContentLoaded', function () {
  const prevBtn = document.querySelector('.clients-carousel-prev');
  const nextBtn = document.querySelector('.clients-carousel-next');
  const track = document.querySelector('.clients-carousel-track');
  let cards = Array.from(track.children);
  const visibleCount = 4;

// elements are presemt or not 
  console.log('prevBtn:', prevBtn, 'nextBtn:', nextBtn, 'track:', track, 'cards:', cards);

  function updateCarousel() {

    //  reset transform by using this method

    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    cards = Array.from(track.children);
  }

  if (prevBtn && nextBtn && track && cards.length > 0) {
    prevBtn.addEventListener('click', function () {
      console.log('Prev button clicked');


      // for last to 1 
      track.insertBefore(track.lastElementChild, track.firstElementChild);
      updateCarousel();
    });

    nextBtn.addEventListener('click', function () {
      console.log('Next button clicked');


      // opposite of above 
      track.appendChild(track.firstElementChild);
      updateCarousel();
    });

    
    window.addEventListener('resize', updateCarousel);

  
    updateCarousel();
  } else {
    console.warn('Trusted Clients carousel: One or more elements not found or not enough cards.');
  }
}); 