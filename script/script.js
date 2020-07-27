'use strict';

// popup
const togglePopUp = () => {
  const body = document.querySelector('body'),
        popupCall = document.querySelector('.popup-call'),
        popupClose = document.querySelector('.popup-close');

  const addSentenceBtn = document.querySelector('.add-sentence-btn'),
        hiddenItems = document.querySelectorAll('.hidden-item'),
        popupDiscount = document.querySelector('.popup-discount');
  
  body.addEventListener('click', (event) => {
    // event.preventDefault();
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

    if (target.matches('.call-btn')) {
      popupCall.style.display = 'block';
      return;
    }
    if (target === popupClose) {
      event.preventDefault();
      popupCall.style.display = 'none';
      return;
    } 
    // Закрываем форму по нажатию на подложку
    if (target.matches('.popup-call')) {
      popupCall.style.display = 'none';
      return;
    }

    if (target.matches('.popup-close')) {
      event.preventDefault();
      popupDiscount.style.display = 'none';
      return;
    }
    // Закрываем форму по нажатию на подложку
    if (target.matches('.popup-discount')) {
      popupDiscount.style.display = 'none';
      return;
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
        form2 = document.getElementById('form2'),
        discountForm = document.getElementById('discount-form');

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
  const checkDiscountForm = (event) => {
    let target = event.target;
    if (target.matches('#phone_11')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#name_11')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  };

  // Обработчики событий корректного ввода данных в форму
  form1.addEventListener('input', checkForm1);
  form2.addEventListener('input', checkForm2);
  discountForm.addEventListener('input', checkDiscountForm);

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

  // Функция очистки discountForm
  const clearDiscountForm = () => {      
    const discountFormName = document.getElementById('name_11'),
    discountFormPhone = document.getElementById('phone_11');
    discountFormName.value = '';
    discountFormPhone.value = '';
  };
  // discountForm
  discountForm.addEventListener('submit', (event) => {
    event.preventDefault();
    discountForm.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(discountForm);
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
        clearDiscountForm();
        setTimeout(updateForm, 3000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearDiscountForm();
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

// Калькулятор
const calculator = () => {
  const DATA = {
    price: [10000, 15000],
    diameter: [2000, 3000],
    numberRings: [3000, 5000, 4500, 7500],
    bottomWell: [1000, 2000]
  };
  // все данные из калькулятора сохранять в объект
  const resultDATA = {
    totalPrice: 0,
    typeOfSeptic: '',
    optionsOfSeptic: [],
    bottomWell: '',
    distance: 0
  }

  const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Идет отправка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const calcForm = document.getElementById('calc-form');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem;';

  const accordion = document.getElementById('accordion'),
        myonoffswitch = document.getElementById('myonoffswitch'),
        myonoffswitchTwo = document.getElementById('myonoffswitch-two'),
        onoffswitchLabel = document.querySelectorAll('.onoffswitch-label'),
        secondWell = document.querySelector('.second-well'),
        calcResult = document.getElementById('calc-result'),
        formControl = document.querySelectorAll('.form-control'),
        distance = document.getElementById('distance');

  let options = [];

  const renderOptions = () => {
    formControl.forEach((elem, index) => {
      options[index] = elem.value;
    });
    // console.log('options: ', options);    
    resultDATA.optionsOfSeptic = options;

  };

  renderOptions();

  // калькулятор подсчитывает примерную стоимость
  const priceCalculation = () => {
    let result = 0;

    // Опции для приемного колодца
    const optionFunc = () => {
      if (options[0] === '2 метра') {
        result += DATA.diameter[0];
      }
      if (options[1] === '2 штуки') {
        result += DATA.numberRings[0];
      }
      if (options[1] === '3 штуки') {
        result += DATA.numberRings[1];
      }
    };

    // Опции для дренажного колодца
    const optionFunc2 = () => {
      if (options[2] === '2 метра') {
        result += DATA.diameter[1];
      }
      if (options[3] === '2 штуки') {
        result += DATA.numberRings[2];
      }
      if (options[3] === '3 штуки') {
        result += DATA.numberRings[3];
      }
    }
    
    // Считаем стоимость в зависимости от типа септика
    // Однокамерный септик
    if (myonoffswitch.checked) {
      result += DATA.price[0];
      optionFunc();
      resultDATA.typeOfSeptic = 'Однокамерный септик';
    } else {  // Двухкамерный септик
      result += DATA.price[1];
      optionFunc();
      optionFunc2();
      resultDATA.typeOfSeptic = 'Двухкамерный септик';
    }

    // Считаем стоимость в зависимости от наличия днища
    if (myonoffswitchTwo.checked && myonoffswitch.checked) {
      result += DATA.bottomWell[0];
      resultDATA.bottomWell = 'Есть днище колодца';
    } else if (myonoffswitchTwo.checked && !myonoffswitch.checked) {
      result += DATA.bottomWell[1];
      resultDATA.bottomWell = 'Есть днище колодца';
    } else {
      resultDATA.bottomWell = 'Нет днища колодца';
    }
    
    calcResult.value = result;
    resultDATA.totalPrice = result;
  };

  priceCalculation();

  // Скрываем второй колодец, если выбран однокамерный тип
  const hideSecondWell = () => {
    if (myonoffswitch.checked) {
      secondWell.style.display = 'none';
    } else {
      secondWell.style.display = 'block';
    }
  };

  // Реализуем переключение checkbox в калькуляторе
  onoffswitchLabel.forEach((elem) => {
    elem.addEventListener('click', () => {
      if (elem.previousElementSibling.checked) {
        elem.previousElementSibling.checked = false;
        hideSecondWell();
        priceCalculation();
      } else {
        elem.previousElementSibling.checked = true;
        hideSecondWell();
        priceCalculation();
      }
    });
  });

  // Меняем опции
  const handlerCalculator = () => {
    const target = event.target;
    // console.log('target: ', target);
    formControl.forEach((elem) => {
      if (elem = target) {
        renderOptions();     
      }
    });    
    priceCalculation();
    resultDATA.distance = distance.value;
  };
  // Обработчик события при смене опций
  accordion.addEventListener('change', handlerCalculator);

  // Отправляем данные из формы на сервер в формате JSON

  // Функции проверки корректного ввода символов в формы
  const checkCalcForm = (event) => {
    let target = event.target;
    if (target.matches('#phone_1')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#name_1')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  };
  // Обработчики событий корректного ввода данных в форму
  calcForm.addEventListener('input', checkCalcForm);
  // Функция очистки подписи под формой
  const updateForm = () => {
    statusMessage.textContent = '';
  };  
  // Функция очистки calcForm
  const clearCalcForm = () => {      
    const calcFormName = document.getElementById('name_1'),
          calcFormPhone = document.getElementById('phone_1');
    calcFormName.value = '';
    calcFormPhone.value = '';
  };
  // calcForm
  calcForm.addEventListener('submit', (event) => {
    event.preventDefault();
    calcForm.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(calcForm);
    let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    body.order = resultDATA;
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
        clearCalcForm();
        setTimeout(updateForm, 3000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearCalcForm();
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

calculator();