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

/**
 * Анимации блока "КАК ЭТО РАБОТАЕТ"
 */
const images = [];
const animationQueue = [];
let currentAnimation = null;
const playNext = () => {
  const next = animationQueue.shift();
  if (!next) return;
  play(next);
};
const play = (img, force) => {
  img.played = true;
  if (!force && currentAnimation) {
    animationQueue.push(img);
    return;
  }
  img.$el.find('animate, animateTransform').each((i, animate) => animate.beginElement());
  if (!force) {
    currentAnimation = img;
    setTimeout(() => {
      currentAnimation = null;
      playNext();
    }, 1000);
  }
};
$('.works__image img').each((i, el) => {
  $.get(el.src, (content) => {
    const $img = $(content).find('svg');
    $(el).replaceWith($img);
    const $parent = $img.parents('.works__item');
    const img = { $el: $img, el: $parent[0], played: false };
    $parent.on('mouseenter', () => {
      play(img, true);
      setTimeout(() => $img[0].pauseAnimations(), 750);
    });
    $parent.on('mouseleave', () => $img[0].unpauseAnimations());
    images.push(img);
  });
});
const isImgInViewport = () => {
  const windowTop = window.pageYOffset;
  const windowBottom = windowTop + window.innerHeight;
  images.forEach((img) => {
    if (img.played) return;
    const top = img.el.offsetTop;
    const bottom = top + img.el.offsetHeight;
    if (windowTop < top && windowBottom > bottom) play(img);
  });
  window.requestAnimationFrame(isImgInViewport);
};
isImgInViewport();
