$('.menu__cabinet, .menu__button').magnificPopup({
  items: {
    src:  '#popup-register',
    type: 'inline'
  }
});

const $menu = $('.menu__wrapper');
const activeClass = 'menu__wrapper--active';
const visibleClass = 'menu__wrapper--visible';
$('.menu__hamburger, .menu__close').on('click', () => {
  $menu.hasClass(activeClass)
    ? close()
    : open();
});
$menu.find('a').on('click', close);

function close() {
  $menu.removeClass(activeClass);
  setTimeout(() => $menu.removeClass(visibleClass), 100);
}

function open() {
  $menu.addClass(visibleClass);
  requestAnimationFrame(() => $menu.addClass(activeClass));
}

