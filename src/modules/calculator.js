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

export default calculator;