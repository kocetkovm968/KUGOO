/* слайдер для секции "products" */
const productsSlider = new Swiper('.products-slider', {
  speed: 400,
  slidesPerView: 1,
  breakpoints: {
    520: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    780: {
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

  