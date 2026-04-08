
// it is a loop for 2 cards only 

const cards = document.querySelectorAll('.client-say-card');
const leftBtn = document.querySelector('.client-say-arrow-left');
const rightBtn = document.querySelector('.client-say-arrow-right');
let startIndex = 0;
function showCards() {
  cards.forEach((card, i) => {
    card.style.display = (i === startIndex) ? 'flex' : 'none';
  });
}
leftBtn.addEventListener('click', () => {
  startIndex = (startIndex - 1 + 2) % 2;
  showCards();
});
rightBtn.addEventListener('click', () => {
  startIndex = (startIndex + 1) % 2;
  showCards();
});
showCards();
