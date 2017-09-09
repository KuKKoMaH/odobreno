$('.menu__cabinet, .menu__button').magnificPopup({
  items: {
    src:  '#popup-register',
    type: 'inline'
  }
});

const $menu = $('.menu__wrapper');
const activeClass = 'menu__wrapper--active';
$('.menu__hamburger, .menu__close').on('click', () => {
  $menu.hasClass(activeClass)
    ? close()
    : open();
});
$menu.find('a').on('click', close);

function close() {
  $menu.removeClass(activeClass);
  setTimeout(() => $menu.css('display', 'none'), 100);
}

function open() {
  $menu.css('display', 'block');
  requestAnimationFrame(() => $menu.addClass(activeClass));
}

