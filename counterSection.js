

document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.counter-number');
  let started = false;

  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const increment = Math.ceil(target / 80);
    function update() {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(update);
      }
    }
    update();
  }

  function startCounters() {
    if (started) return;
    counters.forEach(animateCounter);
    started = true;
  }

  // it is happen when view reach to the section

  const section = document.querySelector('.counter-section');
  if (section) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(section);
  }
}); 