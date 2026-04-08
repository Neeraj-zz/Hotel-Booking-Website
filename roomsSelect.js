

document.addEventListener('DOMContentLoaded', function () {
  const roomsBox = document.querySelector('.rooms-select-box');
  if (!roomsBox) return;

  // for 1,2,3,4 options 
  const dropdown = document.createElement('div');
  dropdown.className = 'rooms-dropdown';
  dropdown.style.display = 'none';
  dropdown.innerHTML = Array.from({length: 5}, (_, i) => `<div class='rooms-option' data-value='${i+1}'>${i+1}</div>`).join('');
  document.body.appendChild(dropdown);

  function positionDropdown() {
    const rect = roomsBox.getBoundingClientRect();
    dropdown.style.position = 'absolute';
    dropdown.style.left = rect.left + window.scrollX + 'px';
    dropdown.style.top = rect.bottom + window.scrollY + 'px';
    dropdown.style.zIndex = 1000;
    dropdown.style.minWidth = rect.width + 'px';
  }

  roomsBox.addEventListener('click', function (e) {
    e.stopPropagation();
    positionDropdown();
    dropdown.style.display = 'block';
  });

  document.addEventListener('click', function () {
    dropdown.style.display = 'none';
  });

  dropdown.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.classList.contains('rooms-option')) {
      const value = e.target.dataset.value;
      const label = roomsBox.querySelector('.rooms-label');
      label.innerHTML = `<span style='font-weight:normal;'>${value}</span>`;
      dropdown.style.display = 'none';
    }
  });
}); 