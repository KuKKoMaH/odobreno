import Input from '../input/input';
import { updateOrder } from '../../js/api';
import { getParam } from '../../js/history';

const orderId = getParam('order');

let currentAddress = null;
const $address = new Input({
  $el:       $('#form-address').parent(),
  type:      'suggestions',
  onSelect:  suggest => (currentAddress = suggest),
  validator: { 'Введите адрес': () => !!currentAddress },
});

const $flat = new Input({
  $el:       $('#form-flat').parent(),
  validator: { 'Введите номер': (val) => !!val },
});

const $name = new Input({
  $el:       $('#form-name').parent(),
  validator: { 'Введите имя': val => !!val },
});
const $surname = new Input({
  $el:       $('#form-surname').parent(),
  validator: { 'Введите фамилию': val => !!val },
});
const $patronymic = new Input({
  $el:       $('#form-patronymic').parent(),
  validator: { 'Введите отчество': val => !!val },
});

const $phone = new Input({
  $el:       $('#form-phone').parent(),
  type:      'phone',
  validator: { 'Введите телефон': val => !!val },
});

const $date = new Input({
  $el:       $('#form-date').parent(),
  type:      'date',
  validator: { 'Выберите дату': val => !!val },
});

const $time = new Input({
  $el:       $('#form-time').parent(),
  validator: { 'Выберите время': val => !!val },
});

const $comment = new Input({
  $el: $('#form-comment').parent(),
});

const fields = [$address, $flat, $name, $surname, $patronymic, $phone, $date, $time, $comment];
// const $button = $('.header__submit button');

$('#form-order').on('submit', (e) => {
  e.preventDefault();

  fields.forEach(field => field.validate());
  if (fields.some(field => !field.isValid())) return;

  const data = {
    phone:          $phone.getValue(),
    address:        {
      address:     currentAddress.value,
      houseNumber: currentAddress.data.house,
      flatNumber:  $flat.getValue(),
      fiasGuid:    currentAddress.data.fias_id,
      lat:         currentAddress.data.geo_lat,
      lon:         currentAddress.data.geo_lon,
    },
    inspectionDate: $date.getValue(),
    inspectionTime: $time.getValue(),
    comment:        $comment.getValue(),
  };

  console.log(data);
});
