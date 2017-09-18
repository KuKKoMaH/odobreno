import { getParam } from '../../js/history';
import { getOrder, confirmOrder } from '../../js/api';
import Auth from '../../js/Auth';

const $form = $('#form-docs');

if ($form.length) {
  const orderId = getParam('order');

  getOrder(orderId, Auth.token).then(order => {
    $('.form__form').show();

    $form.on('submit', (e) => {
      e.preventDefault();
      const data = {
        legalPersonOwner:   $('#form-legalPersonOwner').prop('checked'),
        minorOwner:         $('#form-minorOwner').prop('checked'),
        onerousTransaction: $('#form-onerousTransaction').prop('checked')
      };
      confirmOrder(orderId, data, Auth.token)
        .then(() => (window.location.href = $form.attr('action')))
    })

  })
    .catch(() => $('.form__error').show())
    .always(() => $('.form__spinner').hide());

  // const file = document.getElementById('file');
  // if (file) {
  //   require.ensure([], () => {
  //     const Dropzone = require('dropzone');
  //     new Dropzone(file, { url: '/file/post' });
  //   });
  // }
}
