const sendFormPopUp = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Идет отправка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const discountForm = document.getElementById('discount-form'),
        consultationForm = document.getElementById('consultation-form'),
        checkForm = document.getElementById('check-form'),
        message = document.getElementById('message');

  let yourQuestion; // вопрос из последней формы

  message.addEventListener('input', () => {
    yourQuestion = message.value;
  });
  
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem;';

  // Функции проверки корректного ввода символов в формы
  const checkDiscountForm = (event) => {
    let target = event.target;
    if (target.matches('#phone_11')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#name_11')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  };
  const checkConsultationForm = (event) => {
    let target = event.target;
    if (target.matches('#phone_13')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#name_13')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  };
  const checkCheckForm = (event) => {
    let target = event.target;
    if (target.matches('#phone_12')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#name_12')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  };

  // Обработчики событий корректного ввода данных в форму
  discountForm.addEventListener('input', checkDiscountForm);
  consultationForm.addEventListener('input', checkConsultationForm);
  checkForm.addEventListener('input', checkCheckForm);

  // Функция очистки подписи под формой
  const updateForm = () => {
    statusMessage.textContent = '';
  };
 
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

  // Функция очистки consultationForm
  const clearConsultationForm = () => {      
    const consultationFormName = document.getElementById('name_13'),
    consultationFormPhone = document.getElementById('phone_13');
    consultationFormName.value = '';
    consultationFormPhone.value = '';
  };
  // consultationForm
  consultationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    consultationForm.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(consultationForm);
    let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    body.userQuestion = yourQuestion;
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
        clearConsultationForm();
        setTimeout(updateForm, 3000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearConsultationForm();
        setTimeout(updateForm, 3000);
      });
  });

  // Функция очистки checkForm
  const clearCheckForm = () => {      
    const checkFormName = document.getElementById('name_12'),
        checkFormPhone = document.getElementById('phone_12');
    checkFormName.value = '';
    checkFormPhone.value = '';
  };
  // checkForm
  checkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkForm.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(checkForm);
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
        clearCheckForm();
        setTimeout(updateForm, 3000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearCheckForm();
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

export default sendFormPopUp;