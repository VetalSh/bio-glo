'use strict';

import togglePopUp from './modules/togglePopUp';
import sendForm from './modules/sendForm';
import questions from './modules/questions';
import onlineConstructor from './modules/onlineConstructor';
import calculator from './modules/calculator';
import sendFormPopUp from './modules/sendFormPopUp';

// Открытие и закрытие модальных окон
togglePopUp();
// Отправка данных на сервер с форм на сайте
sendForm();
// Часто задаваемые вопросы, аккордеон
questions();
// Конструктор-калькулятор в виде аккордеона
onlineConstructor();
// Калькулятор
calculator();
// Отправка данных на сервер с модальных окон
sendFormPopUp();