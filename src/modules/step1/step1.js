import Input from '../input/input';
import { getOrder, updateOrder, payBonusOrder, payOrder } from '../../js/api';
import { getParam } from '../../js/history';
import Auth from '../../js/Auth';

const $form = $('#form-order');

if ($form.length) {
  const orderId = getParam('order');

  $.when(
    Auth.getProfile(),
    getOrder(orderId, Auth.token)
  ).then(( profile, [order] ) => {
      $('.form__form').show();

      $('#form-address').val(order.address);
      $('#form-flat').val(order.flat);
      $('#form-sellingPrice').val(order.salePrice);

      $('#form-name').val(profile.name);
      $('#form-surname').val(profile.surname);
      $('#form-patronymic').val(profile.parentalName);
      $('#form-phone').val(profile.phone).mask('+7 (999) 999-99-99');
      if (order.inspectionDate) $('#form-date').val(order.inspectionDate.reverse().join('.'));
      if (order.timeBlock) $('#form-time').val(order.timeBlock);
      $('#form-partner').val(order.partnerCode);
      $('#form-comment').val(order.comment);

      const $sellingPrice = new Input({
        $el:       $('#form-sellingPrice').parent(),
        validator: { 'Введите цену продажи': ( val ) => !!val },
        type:      'currency',
        onBlur:    saveOrder,
      });
      const $name = new Input({
        $el:       $('#form-name').parent(),
        validator: { 'Введите имя': val => !!val },
        onBlur:    saveOrder,
      });
      const $surname = new Input({
        $el:       $('#form-surname').parent(),
        validator: { 'Введите фамилию': val => !!val },
        onBlur:    saveOrder,
      });
      const $patronymic = new Input({
        $el:       $('#form-patronymic').parent(),
        validator: { 'Введите отчество': val => !!val },
        onBlur:    saveOrder,
      });
      const $date = new Input({
        $el:       $('#form-date').parent(),
        type:      'date',
        validator: { 'Выберите дату': val => !!val },
        onBlur:    saveOrder,
      });
      const $time = new Input({
        $el:       $('#form-time').parent(),
        validator: { 'Выберите время': val => !!val },
        onBlur:    saveOrder,
      });
      const $partner = new Input({
        $el:       $('#form-partner').parent(),
        validator: { 'Невереый код партнера': val => !val || !!window.PARTNERS[val] },
        onBlur:    saveOrder,
      });
      const $comment = new Input({
        $el:    $('#form-comment').parent(),
        type:   'textarea',
        onBlur: saveOrder,
      });

      const fields = [$sellingPrice, $name, $surname, $patronymic, $date, $time, $comment];
      const $buttons = $('.form__button');
      const $button_pay = $('#form-pay');
      const $button_bonus = $('#form-bonus');
      const $offer = $('#form-offer');

      $buttons.attr('disabled', true);
      $offer.on('change', () => {
        $button_pay.attr('disabled', !$offer.prop('checked'));
        if (profile.bonus > 0) $button_bonus.attr('disabled', !$offer.prop('checked'));
      });

      $button_bonus.on('click', ( e ) => {
        e.preventDefault();
        saveOrder()
          .then(() => payBonusOrder(orderId, Auth.token))
          .then(() => window.location.href = $form.attr('action') + '?order=' + orderId);
        // ;
      });

      $form.on('submit', ( e ) => {
        e.preventDefault();

        const url = `${$form.prop('action')}?order=${orderId}`;
        // const url = `${$form.prop('action')}`;

        saveOrder()
          .catch(err => {
          })
          .then(( data ) => payOrder(orderId, url, Auth.token))
          .then(( redirect ) => (window.location.href = redirect.formUrl))
        // console.log(data);
      });

      function saveOrder() {
        const data = collectOrder();
        console.log(data);
        if (!data) return;
        return updateOrder(data, Auth.token);
      }

      function collectOrder() {
        // if (!$offer.prop('checked')) return null;
        // fields.forEach(field => field.validate());
        // if (fields.some(field => !field.isValid())) return null;

        return {
          id:                order.id,
          inspectionDate:    $date.getValue(),
          timeBlock:         $time.getValue(),
          comment:           $comment.getValue(),
          surname:           $surname.getValue(),
          name:              $name.getValue(),
          parentalName:      $patronymic.getValue(),
          salePrice:         +$sellingPrice.getValue(),
          acceptedAgreement: true,
          partnerCode:       $partner.getValue(),
        };

      }
    }
  )
    .catch(() => $('.form__error').show())
    .always(() => $('.form__spinner').hide());
}
