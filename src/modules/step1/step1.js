import Input from '../input/input';
import { getOrder, updateOrder } from '../../js/api';
import { getParam } from '../../js/history';

const $form = $('#form-order');

if ($form.length) {
  const orderId = getParam('order');

  getOrder(orderId)
    .done((order) => {
      $('.form__form').show();

      $('#form-address').val(order.address);
      $('#form-flat').val(order.flat);
      $('#form-sellingPrice').val(order.salePrice);
      if (order.inspectionDate) $('#form-date').val(order.inspectionDate.reverse().join('.'));
      if (order.timeBlock) $('#form-time').val(order.timeBlock);
      $('#form-comment').val(order.comment);

      const $sellingPrice = new Input({
        $el:       $('#form-sellingPrice').parent(),
        validator: { 'Введите цену продажи': (val) => !!+val },
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

      const fields = [$sellingPrice, $name, $surname, $patronymic, $date, $time, $comment];
      const $button = $('.form__button');
      const $offer = $('#form-offer');

      $button.attr('disabled', true);
      $offer.on('change', () => $button.attr('disabled', !$offer.prop('checked')));

      $form.on('submit', (e) => {
        e.preventDefault();

        if (!$offer.prop('checked')) return;
        fields.forEach(field => field.validate());
        if (fields.some(field => !field.isValid())) return;

        const data = {
          id:                order.id,
          inspectionDate:    $date.getValue(),
          timeBlock:         $time.getValue(),
          comment:           $comment.getValue(),
          surname:           $surname.getValue(),
          name:              $name.getValue(),
          parentalName:      $patronymic.getValue(),
          salePrice:         +$sellingPrice.getValue(),
          acceptedAgreement: true,
        };

        updateOrder(data)
          .then(() => (window.location.href = e.target.action + '?order=' + order.id))
        // console.log(data);
      });
    })
    .catch(() => $('.form__error').show())
    .always(() => $('.form__spinner').hide());
}
