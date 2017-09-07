import 'jquery';
import 'owl.carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';

$('.last__slider').owlCarousel({
  items:   1,
  margin:  24,
  dots:    false,
  nav:     true,
  navText: ['', ''],

  responsive: {
    460: {
      items: 2,
    },
    768:  {
      items: 3,
    },
    992:  {
      items: 4,
    },
    1199: {
      items: 5,
    }
  }
});