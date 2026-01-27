/* слайдер для секции "products" */
const productsSlider = new Swiper('.products-slider', {
  speed: 400,
  slidesPerView: 1,
  breakpoints: {
    520: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1040: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});


/* маска для поля ввода номера телефона */
/* Создаем префикс +7, даже если вводят 8 или 9 */
const prefixNumber = (str) => {
  /* если вводят семерку, добавляем ей скобку */
  if (str === "7") {
    return "7 (";
  }
  /* если вводят восьмерку, ставим вместо нее +7 ( */
  if (str === "8") {
    return "+7 (";
  }
  /* если пишут девятку, заменяем на +7 (9  */
  if (str === "9") {
    return "7 (9";
  }
  /* в других случаях просто 7 (  */
  return "7 (";
}; /* профикс в любом раскладе будет +7 () */

/* Ловим события ввода в любом поле */
document.addEventListener("input", (e) => {
  /* Проверяем, что это поле имеет класс phone-mask */
  if (e.target.classList.contains("phone-mask")) {
    /* поле с телефоном помещаем в переменную input */
    const input = e.target;
    /* вставляем плюс в начале номера */
    const value = input.value.replace(/\D+/g, "");
    /* длинна номера 11 символов */
    const numberLength = 11;

    /* Создаем переменную, куда будем записывать номер */
    let result;
    /* Если пользователь ввел 8... */
    if (input.value.includes("+8") || input.value[0] === "8") {
      /* Стираем восьмерку */
      result = "";
    } else {
      /* Оставляем плюсик в поле */
      result = "+";
    }

    /* Запускаем цикл, где переберем каждую цифру от 0 до 11 */
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          /* в самом начале ставим префикс +7 ( */
          result += prefixNumber(value[i]);
          continue;
        case 4:
          /* добавляем после "+7 (" круглую скобку ")" */
          result += ") ";
          break;
        case 7:
          /* дефис после 7 символа */
          result += "-";
          break;
        case 9:
          /* еще дефис  */
          result += "-";
          break;
        default:
          break;
      }
      /* на каждом шаге цикла добавляем новую цифру к номеру */
      result += value[i];
    }
    /* итог: номер в формате +7 (999) 123-45-67 */
    input.value = result;
  }
});


//Валидация формы
const forms = document.querySelectorAll("form");//собираем все формы
forms.forEach((form) => {//перебираем все формы
  // инициализируем библиотеку проверки
  const validation = new JustValidate(form, {
    errorFieldCssClass: 'is-invalid',
  });
  // применить правила к полям формы
  validation
    .addField('[name=usermail]', [
      {
        rule: 'required',
        errorMessage: 'Укажите адрес электронной почты',
      },
    ])
    .addField('[name=userphone]', [
      {
        rule: 'required',
        errorMessage: 'Укажите телефон',
      },
    ]);
    //Проверка пройдена и форма отправлена
    // .onSuccess((event) => {
    //   const thisForm = event.target; //определяем в какой мы форме
    //   const formData = new FormData(thisForm); //все данные из нашей формы

    //   //функция которая незаметно дял пользователя возьмет данные из formData и отправит на URL
    //   const ajaxSend = (formData) => {
    //     //возьми атрибут этой формы и будет тот самый URL
    //     fetch(thisForm.getAttribute('action'), {
    //       //со следующими опциями
    //       method: thisForm.getAttribute('method'),//метод которой указан в этой форме
    //       body: formData, //укажи в теле запроса все то что содержится в этой форме
    //     }).then((Response) => { //тогда получи ответ
    //       if(Response.ok) {//если с ответом все ок
    //         thisForm.reset();//очисти форму
    //         currentModal.classList.remove("is-open");//закрой текущее мод.окно
    //         alertModal.classList.add("is-open");//открой мод.окно alert
    //         currentModal = alertModal;//переопределяем что тек.мод окно это alert
    //         /* назначаем контент текущего мод.окна */
    //         modalСontent = currentModal.querySelector(".modal-content");
    //         /* отслеживаем клик по окну и пустым областям */
    //         currentModal.addEventListener("click", (event) => {
    //           /* если в пути (composedPath()) куда кликнули нет(!) элемента modalСontent) */
    //           if (!event.composedPath().includes(modalСontent)) {
    //             /* то закрываем окно */
    //             currentModal.classList.remove("is-open");
    //           }
    //         });
    //       } else {
    //         alert(Response.statusText);
    //       }
    //     });
    //   };
    //   ajaxSend(formData);//вызываем функцию с параметрами formData
    // });
});
  