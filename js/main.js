/* слайдер для секции "products" */
const blogSlider = new Swiper('.products-slider', {
  speed: 400,
  slidesPerView: 2,
  /* spaceBetween: 30, */
  /* loop: true, */
  /* navigation: {
    nextEl: ".blog .slider-button-next",
    prevEl: ".blog .slider-button-prev",
  }, */
  /* breakpoints: { */
    // when window width is >= 1150px
  /*   993: {
      slidesPerView: 3,
    },
    // when window width is >= 1150px
  /*   1150: {
      slidesPerView: 4,
    },
  }, */
});