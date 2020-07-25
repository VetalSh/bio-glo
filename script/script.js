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

// send-ajax-form
const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Идет отправка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem;';

  // Функции проверки корректного ввода символов в формы
  const checkForm1 = (event) => {
    let target = event.target;
    if (target.matches('#phone_3')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    }
  };
  const checkForm2 = (event) => {
    let target = event.target;
    if (target.matches('#phone_2')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#name_2')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  };

  // Обработчики событий корректного ввода данных в форму
  form1.addEventListener('input', checkForm1);
  form2.addEventListener('input', checkForm2);

  // Функция очистки подписи под формой
  const updateForm = () => {
    statusMessage.textContent = '';
  };
  
  // Функция очистки формы1
  const clearForm1 = () => {      
    const form1Phone = document.getElementById('phone_3');
    form1Phone.value = '';
  };
  // Форма1
  form1.addEventListener('submit', (event) => {            
    event.preventDefault();
    form1.appendChild(statusMessage);      
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form1);
    let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
        clearForm1();
        setTimeout(updateForm, 3000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearForm1();
        setTimeout(updateForm, 3000);
      });
  });
  
  // Функция очистки формы2
  const clearForm2 = () => {      
    const form2Name = document.getElementById('name_2'),
          form2Phone = document.getElementById('phone_2');
    form2Name.value = '';
    form2Phone.value = '';
  };
  // Форма2
  form2.addEventListener('submit', (event) => {
    event.preventDefault();
    form2.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form2);
    let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
        clearForm2();
        setTimeout(updateForm, 3000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearForm2();
        setTimeout(updateForm, 3000);
      });
  });

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
  };
};

sendForm();

// Часто задаваемые вопросы, аккордеон
const questions = () => {
  const accordionTwo = document.getElementById('accordion-two'),
        headingOne = document.getElementById('headingOne-two'),
        headingTwo = document.getElementById('headingTwo-two'),
        headingThree = document.getElementById('headingThree-two'),
        collapseOne = document.getElementById('collapseOne-two'),
        collapseTwo = document.getElementById('collapseTwo-two'),
        collapseThree = document.getElementById('collapseThree-two');
  let arrayPanel = [collapseOne, collapseTwo, collapseThree];

  const deletePanel = () => {
    arrayPanel.forEach((item) => {
      item.classList.remove('in');
    });    
  };

  accordionTwo.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    target = target.closest('.panel-heading');

    if (target === headingOne) {
      deletePanel();
      collapseOne.classList.add('in');
    } else if (target === headingTwo) {
      deletePanel();
      collapseTwo.classList.add('in');
    } else if (target === headingThree) {
      deletePanel();
      collapseThree.classList.add('in');
    }
  });
};

questions();

// Конструктор-калькулятор в виде аккордеона
const onlineConstructor = () => {
  const accordion = document.getElementById('accordion'),
        headingOne = document.getElementById('headingOne'),
        headingTwo = document.getElementById('headingTwo'),
        headingThree = document.getElementById('headingThree'),
        headingFour = document.getElementById('headingFour'),
        collapseOne = document.getElementById('collapseOne'),
        collapseTwo = document.getElementById('collapseTwo'),
        collapseThree = document.getElementById('collapseThree'),
        collapseFour = document.getElementById('collapseFour');
  let arrayPanel = [collapseOne, collapseTwo, collapseThree, collapseFour];

  const deletePanel = () => {
    arrayPanel.forEach((item) => {
      item.classList.remove('in');
    });    
  };
  
  accordion.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;         
    let target1 = target.closest('.panel-heading'); // Для переключения по заголовкам
    let target2 = target.closest('.construct-btn'); // Для переключения по кнопкам
    
    if (target2) {
      target2 = target2.getAttribute('href');
    }

    if (target1 === headingOne) {
      deletePanel();
      collapseOne.classList.add('in');
    } else if (target1 === headingTwo || target2 === '#collapseTwo') {
      deletePanel();
      collapseTwo.classList.add('in');
    } else if (target1 === headingThree || target2 === '#collapseThree') {
      deletePanel();
      collapseThree.classList.add('in');
    } else if (target1 === headingFour || target2 === '#collapseFour') {
      deletePanel();
      collapseFour.classList.add('in');
    }
  });  
};

onlineConstructor();