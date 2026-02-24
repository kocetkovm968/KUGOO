const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal_content');
const modalClose = modal.querySelector('.modal_close');

const catalog = document.querySelector('.catalog');
const catalogBtn = document.querySelector('.catalog-btn');
const catalogClose = document.querySelector('.catalog_close');
const catalogItem = document.querySelectorAll('.catalog_item');

const body = document.body;/* для запрета скролла страницы */


/* открытие меню каталога */
catalogBtn.addEventListener("click", () => {
  catalog.classList.toggle('is-open');
  body.classList.toggle('stop-scroll');
  catalogClose.addEventListener("click", () => {
    catalog.classList.remove('is-open');
    body.classList.remove('stop-scroll')
  });
});


/* появление подкаталога при наведении на меню каталога */
// document.querySelectorAll('.catalog_item').forEach(item => {
catalogItem.forEach(item => {
  // обработчик при наведении на пункт меню
  item.addEventListener('mouseenter', function() {
    // ищем подменю внутри пункта меню
    const subcatalog = this.querySelector('.subcatalog');
    // если подменю нет то прерываем функцию
    if (!subcatalog) return;

    // узнаем координаты относительно области просмотра
    const rect = this.getBoundingClientRect();
    // горизонтальное положение пункта меню
    subcatalog.style.left = `${rect.right}px`;
    // вертикальное положение пункта меню
    subcatalog.style.top = `${/* window.scrollY + */ rect.top}px`;
  });
});


/* изменение иконки при клике на нее в карточке товара */
const productsCardBtn = document.querySelectorAll('.products-card-btn');
productsCardBtn.forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("active");
  });
}); 


/* слайдер для секции "products" */
const productsSlider = new Swiper('.products-slider', {
  speed: 400,
  slidesPerView: 1,
  navigation: {
    nextEl: ".products .products-slider-next",
    prevEl: ".products .products-slider-prev",
  },
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


/* скрипт для открытия/закрытия модального окна */
// все кнопки для закрытия модального окна
const modalButtons = document.querySelectorAll("[data-toggle=modal]");
// перебираем массив
modalButtons.forEach((button) => {
  // клик по кнопке
  button.addEventListener("click", (event) => {
    // отменяем действие по умолчанию
    event.preventDefault();
    // открываем модальное окно
    modal.classList.toggle('is-open');
    body.classList.toggle('stop-scroll');
    // отслеживаем клик по модальному окну и прозрачным областям
    modal.addEventListener("click", (event) => {
      // если в пути (composedPath()) куда кликнули нет(!) элемента modalСontent)
      if (!event.composedPath().includes(modalContent)) {
        /* то закрываем окно */
        modal.classList.remove("is-open");
      }
    });
    // отслеживаем клик по кнопке закрыть модального окна
    modalClose.addEventListener("click", () => {
      // закрываем модальное окно
      modal.classList.remove("is-open");
    });
  });
});
/* ловим событие нажатия на кнопки клавиатуры */
document.addEventListener("keyup", (event) => {
  /* если нажали кнопку Escape и мод.окно содержит класс is-open*/
  if (event.key == "Escape" && modal.classList.contains("is-open")) {
    /* закрываем мод.окно */
    modal.classList.toggle("is-open");
  }
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
    .addField('[name=userphone]', [
      {
        rule: 'required',
        errorMessage: 'Укажите телефон',
      },
    ])
    /* .addField('[name=usermail]', [
      {
        rule: 'required',
        errorMessage: 'Укажите почту',
      },
    ]) */
});
