

document.addEventListener('DOMContentLoaded', function () {
  const arrivalBox = document.querySelector('.arrival-date-box');
  if (!arrivalBox) return;

  // for calendar 
  const calendarPopup = document.createElement('div');
  calendarPopup.className = 'calendar-popup';
  calendarPopup.style.display = 'none';
  calendarPopup.innerHTML = generateCalendarHTML(new Date());
  document.body.appendChild(calendarPopup);

  // Positioning for calendar

  function positionPopup() {
    const rect = arrivalBox.getBoundingClientRect();
    calendarPopup.style.position = 'absolute';
    calendarPopup.style.left = rect.left + window.scrollX + 'px';
    calendarPopup.style.top = rect.bottom + window.scrollY + 'px';
    calendarPopup.style.zIndex = 1000;
  }

  arrivalBox.addEventListener('click', function (e) {
    e.stopPropagation();
    positionPopup();
    calendarPopup.style.display = 'block';
  });

  // calendar disappear on outside click any where
  
  document.addEventListener('click', function () {
    calendarPopup.style.display = 'none';
  });

  calendarPopup.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // for date selection
  
  calendarPopup.addEventListener('click', function (e) {
    if (e.target.classList.contains('calendar-day')) {
      const selectedDate = e.target.dataset.date;
      const label = arrivalBox.querySelector('.arrival-label');
      label.innerHTML = `<span style='font-weight:normal;'>${selectedDate}</span>`;
      calendarPopup.style.display = 'none';
    }
  });

  // for departure 
  
  const departureBox = document.querySelector('.departure-date-box');
  if (departureBox) {

    // again for calendar
    
    const departureCalendarPopup = document.createElement('div');
    departureCalendarPopup.className = 'calendar-popup';
    departureCalendarPopup.style.display = 'none';
    departureCalendarPopup.innerHTML = generateCalendarHTML(new Date());
    document.body.appendChild(departureCalendarPopup);

    function positionDeparturePopup() {
      const rect = departureBox.getBoundingClientRect();
      departureCalendarPopup.style.position = 'absolute';
      departureCalendarPopup.style.left = rect.left + window.scrollX + 'px';
      departureCalendarPopup.style.top = rect.bottom + window.scrollY + 'px';
      departureCalendarPopup.style.zIndex = 1000;
    }

    departureBox.addEventListener('click', function (e) {
      e.stopPropagation();
      positionDeparturePopup();
      departureCalendarPopup.style.display = 'block';
    });

    document.addEventListener('click', function () {
      departureCalendarPopup.style.display = 'none';
    });

    departureCalendarPopup.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    departureCalendarPopup.addEventListener('click', function (e) {
      if (e.target.classList.contains('calendar-day')) {
        const selectedDate = e.target.dataset.date;
        const label = departureBox.querySelector('.departure-label');
        label.innerHTML = `<span style='font-weight:normal;'>${selectedDate}</span>`;
        departureCalendarPopup.style.display = 'none';
      }
    });
  }

  function generateCalendarHTML(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let html = `<div class='calendar-header'>${date.toLocaleString('default', { month: 'long' })} ${year}</div><div class='calendar-grid'>`;
    
    html += ['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=>`<div class='calendar-dow'>${d}</div>`).join('');
    
    for (let i = 0; i < firstDay.getDay(); i++) html += `<div></div>`;
    
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const fullDate = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      html += `<div class='calendar-day' data-date='${fullDate}'>${d}</div>`;
    }
    html += '</div>';
    return html;
  }
}); 