import 'jquery';
import 'owl.carousel';
import 'magnific-popup/dist/jquery.magnific-popup.js';
import 'jquery.maskedinput/src/jquery.maskedinput';
// import 'snapsvg';

$('.last__slider').owlCarousel({
  items:      3,
  autoWidth:  true,
  margin:     24,
  dots:       false,
  nav:        true,
  navText:    ['', ''],
  center:     true,
  responsive: {
    768:  {
      items:     3,
      center:    false,
      autoWidth: false,
    },
    992:  {
      items:     4,
      center:    false,
      autoWidth: false,
    },
    1199: {
      items:     5,
      center:    false,
      autoWidth: false,
    }
    // 420:  { items: 2, },
    // 660:  { items: 3, },
  }
});

$('.header__cabinet, .header__button').magnificPopup({
  items: {
    src:  '#popup-register',
    type: 'inline'
  }
});

$('input[type="phone"]').mask("+7 (999) 999-99-99");

$('.works__image img').each((i, el) => {
  $.get(el.src, (content) => {
    const $img = $(content).find('svg');
    $(el).replaceWith($img);
    $img.on('click', () => $img.find('animate, animateTransform').each((i, animate) => animate.beginElement()))
  });
})