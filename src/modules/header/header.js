import Input from '../input/input';
import { createOrder } from '../../js/api';

let currentAddress = null;
const $phone = new Input({
  $el:       $('.header__phone .input'),
  type:      'phone',
  validator: { 'Введите телефон': val => !!val },
});

const $address = new Input({
  $el:       $('.header__address .input'),
  type:      'suggestions',
  onSelect:  suggest => (currentAddress = suggest),
  validator: { 'Введите адрес': () => !!currentAddress },
});

const $flat = new Input({
  $el:       $('.header__flat .input'),
  validator: { 'Введите номер': (val) => !!val },
});

const fields = [$address, $flat, $phone];

$('.header__form').on('submit', (e) => {
  e.preventDefault();

  fields.forEach(field => field.validate());
  if (fields.some(field => !field.isValid())) return;

  const data = {
    phone:   $phone.getValue(),
    address: {
      address:     currentAddress.value,
      houseNumber: currentAddress.data.house,
      flatNumber:  $flat.getValue(),
      fiasGuid:    currentAddress.data.fias_id,
      lat:         currentAddress.data.geo_lat,
      lon:         currentAddress.data.geo_lon,
    },
  };

  createOrder(data);
});
