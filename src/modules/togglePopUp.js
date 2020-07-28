const togglePopUp = () => {
  const body = document.querySelector('body'),
        popupCall = document.querySelector('.popup-call'),
        popupClose = document.querySelector('.popup-close'),
        addSentenceBtn = document.querySelector('.add-sentence-btn'),
        hiddenItems = document.querySelectorAll('.hidden-item'),
        popupDiscount = document.querySelector('.popup-discount'),
        popupCheck = document.querySelector('.popup-check'),
        popupConsultation = document.querySelector('.popup-consultation');
  
  body.addEventListener('click', (event) => {
    let target = event.target;
    
    if (target.matches('.add-sentence-btn')) {
      addSentenceBtn.style.display = 'none';
      hiddenItems.forEach((elem) => {
        elem.classList.remove('visible-sm-block');
        elem.classList.remove('hidden');
        return;
      });
    }
    if (target.matches('.discount-btn')) {
      popupDiscount.style.display = 'block';
      return;
    }
    if (target.matches('.check-btn')) {
      popupCheck.style.display = 'block';
      return;
    }
    if (target.matches('.call-btn')) {
      event.preventDefault();
      popupCall.style.display = 'block';
      return;
    }
    if (target.matches('.consultation-btn')) {
      event.preventDefault();
      popupConsultation.style.display = 'block';
      return;
    }
    // Закрываем форму по нажатию на X
    if (target === popupClose || target.matches('.popup-close')) {
      event.preventDefault();
      popupCall.style.display = 'none';
      popupDiscount.style.display = 'none';
      popupCheck.style.display = 'none';
      popupConsultation.style.display = 'none';
      return;
    }
    // Закрываем форму по нажатию на подложку
    if (target.matches('.popup-discount')
      || target.matches('.popup-check')
      || target.matches('.popup-call')
      || target.matches('.popup-consultation')) {
      popupCall.style.display = 'none';
      popupDiscount.style.display = 'none';
      popupCheck.style.display = 'none';
      popupConsultation.style.display = 'none';
      return;
    }
  });
};

export default togglePopUp;