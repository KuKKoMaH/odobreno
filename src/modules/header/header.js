import Input from '../input/input';
import { login, createOrder } from '../../js/api';
import Auth from '../../js/Auth';

let currentAddress = null;

const $address = new Input({
  $el:       $('.header__address .input'),
  type:      'suggestions',
  onSelect:  suggest => (currentAddress = suggest),
  validator: {
    'Введите адрес':      () => !!currentAddress,
    'Введите номер дома': () => !currentAddress || !!currentAddress.data.house
  },
});

const $flat = new Input({
  $el:       $('.header__flat .input'),
  validator: { 'Введите номер': (val) => !!val },
});

const $phone = new Input({
  $el:       $('.header__phone .input'),
  type:      'phone',
  validator: { 'Введите телефон': val => !!val },
});

const fields = [$address, $flat, $phone];
const $button = $('.header__submit button');
const $error = $('.header__form-error');

$('.header__form').on('submit', (e) => {
  e.preventDefault();

  fields.forEach(field => field.validate());
  if (fields.some(field => !field.isValid())) return;

  const phone = $phone.getValue();
  const data = {
    address:     currentAddress.value,
    houseNumber: currentAddress.data.house,
    flatNumber:  $flat.getValue(),
    fiasGuid:    currentAddress.data.fias_id,
    lat:         currentAddress.data.geo_lat,
    lon:         currentAddress.data.geo_lon,
  };
  $button.attr('disabled', 'disabled');
  $error.html('');

  Auth.auth(phone)
    .then(() => {
      createOrder(data).then((order) => (window.location.href = e.target.action + '?order=' + order.id))
    })
    .always(() => $button.removeAttr('disabled'));
});
