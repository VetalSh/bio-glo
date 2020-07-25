'use strict';

// popup
const togglePopUp = () => {
  const body = document.querySelector('body'),
        popupCall = document.querySelector('.popup-call'),
        popupClose = document.querySelector('.popup-close');
  
  body.addEventListener('click', (event) => {
    let target = event.target;
    if (target.matches('.call-btn')) {
      popupCall.style.display = 'block';
      return;
    } else
    if (target === popupClose) {
      event.preventDefault();
      popupCall.style.display = 'none';
      return;
    } else 
    // Закрываем форму по нажатию на подложку
    if (target.matches('.popup-call')) {
      popupCall.style.display = 'none';
    }
  });
};

togglePopUp();