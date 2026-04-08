// comments can increase the line of the code but it makes the code readable easily and helps 
//  in debugging and updataing on need .
// so I am going to add comments for every section for better understanding for the reader .


const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');
const dotsContainer = document.querySelector('.dots');
let current = 0;
let timer;

//  dotsstarted
// dots are dynamically created for each slide
// it is used to jump on slides

slides.forEach((_, idx) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => showSlide(idx));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('span');


// dots end


// it is used to show the slide by hiding the previous one 

function animateSlideText(slideIdx) {
  const slide = slides[slideIdx];
  const h2 = slide.querySelector('h2');
  const btn = slide.querySelector('.banner-btn');
  const desc = slide.querySelector('.banner-desc');
  if (!h2) return;
  
  if (!h2.querySelector('.letter')) {

    // Split the h2 into text before <br> and after
    // it help to represent the letters one by one on banner .
    const html = h2.innerHTML;
    const brIdx = html.indexOf('<br>');
    let before = html;
    let after = '';
    if (brIdx !== -1) {
      before = html.slice(0, brIdx);
      after = html.slice(brIdx);
    }
    h2.innerHTML = '';
    for (let i = 0; i < before.length; i++) {
      const char = before[i] === ' ' ? '&nbsp;' : before[i];
      h2.innerHTML += `<span class="letter" style="animation-delay:${i * 0.07}s">${char}</span>`;
    }
    h2.innerHTML += after;
  }
    // it is for second slide smaller para 

  if (desc && slideIdx === 1 && !desc.querySelector('.letter')) {
    const text = desc.textContent;
    desc.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i] === ' ' ? '&nbsp;' : text[i];
      desc.innerHTML += `<span class="letter" style="animation-delay:${i * 0.04}s">${char}</span>`;
    }
  }
   

  // button are coming from left 
  if (btn) btn.classList.add('animate-left');
}

// timout is rembered to stop overlapping 

const slideTimeouts = Array.from({length: slides.length}, () => null);

function resetSlideText(slideIdx) {
  const slide = slides[slideIdx];
  const h2 = slide.querySelector('h2');
  const btn = slide.querySelector('.banner-btn');
  const desc = slide.querySelector('.banner-desc');
  if (!h2) return;
  

  // used to clear the timeout which help to call agains for timein
  if (slideTimeouts[slideIdx]) {
    clearTimeout(slideTimeouts[slideIdx]);
    slideTimeouts[slideIdx] = null;
  }
  // text have smooth transition for disapear who is existed already

  const letters = h2.querySelectorAll('.letter');
  letters.forEach(l => l.classList.add('exit'));
  const second = h2.querySelector('span:not(.letter)');
  if (second) second.classList.add('exit');
  if (desc && slideIdx === 1) {
    const descLetters = desc.querySelectorAll('.letter');
    descLetters.forEach(l => l.classList.add('exit'));
  }
  if (btn) btn.classList.add('exit');

  // After transition, restore original text and remove exit class

  slideTimeouts[slideIdx] = setTimeout(() => {
    if (h2.dataset.original) {
      h2.innerHTML = h2.dataset.original;
    }
    if (desc && desc.dataset.original && slideIdx === 1) {
      desc.innerHTML = desc.dataset.original;
    }
    if (btn) btn.classList.remove('animate-left', 'exit');
    slideTimeouts[slideIdx] = null;
  }, 500); 
}

// remebered  h2 for all slides

slides.forEach(slide => {
  const h2 = slide.querySelector('h2');
  if (h2) h2.dataset.original = h2.innerHTML;
  const desc = slide.querySelector('.banner-desc');
  if (desc) desc.dataset.original = desc.innerHTML;
});


// Reset text animation for the previous slide
// and help to text for the new slide
function showSlide(idx) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  
  resetSlideText(current);
  current = idx;
  slides[current].classList.add('active');
  dots[current].classList.add('active');


  
  animateSlideText(current);
  resetTimer();
}

// this is for next and pre 

function nextSlide() {
  showSlide((current + 1) % slides.length);
}

function prevSlide() {
  showSlide((current - 1 + slides.length) % slides.length);
}


// done


// slides are automatocally changes after every 5 seconds

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 5000);
}


// done 




// it is used to restart from first slide after reached at the end .

// On page load, ensure first slide text is in original state and animate in
const firstSlide = slides[0];
const firstH2 = firstSlide.querySelector('h2');
const firstBtn = firstSlide.querySelector('.banner-btn');

if (firstH2) {
  firstH2.classList.remove('exit');
  if (firstH2.dataset.original) firstH2.innerHTML = firstH2.dataset.original;
}
if (firstBtn) firstBtn.classList.remove('animate-left', 'exit');
if (slideTimeouts && slideTimeouts[0]) {
  clearTimeout(slideTimeouts[0]);
  slideTimeouts[0] = null;
}
// for first slide and dot

slides[0].classList.add('active');
dots[0].classList.add('active');
current = 0;
animateSlideText(0);
resetTimer();
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Images appear on click for choose
(function() {
  const cards = Array.from(document.querySelectorAll('.choose-card img'));
  const modal = document.getElementById('choose-image-modal');
  const modalImg = modal.querySelector('.choose-modal-img');
  const closeBtn = modal.querySelector('.choose-modal-close');
  const prevBtn = modal.querySelector('.choose-modal-prev');
  const nextBtn = modal.querySelector('.choose-modal-next');
  const counter = modal.querySelector('.choose-modal-counter');
  let current = 0;

  function showModal(idx) {
    current = idx;
    modalImg.src = cards[current].src;
    counter.textContent = (current+1) + ' of ' + cards.length;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  function showNext() {
    showModal((current+1)%cards.length);
  }
  function showPrev() {
    showModal((current-1+cards.length)%cards.length);
  }
  cards.forEach((img, idx) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', e => {
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