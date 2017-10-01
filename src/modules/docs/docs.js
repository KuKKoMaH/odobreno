import { getParam } from '../../js/history';
import { getOrder, confirmOrder, confirmPayment } from '../../js/api';
import Auth from '../../js/Auth';

const $form = $('#form-docs');

if ($form.length) {
  const orderId = getParam('order');

  getOrder(orderId, Auth.token).then(order => {
    confirmPayment(orderId, getParam('orderId'), getParam('q'), true);

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

  require.ensure([], () => {
    require('blueimp-file-upload');
    const types = [
      'TECHNICAL_DOCUMENT',
      'LEGAL_DOCUMENT'
    ];
    types.forEach((type) => {
      const $el = $(`#${type}`);
      $el.find('.docs__input').fileupload({
        url:       `${API_URL}order/${orderId}/file/${type}`,
        headers:   {
          token: Auth.token,
        },
        paramName: 'file',
        done:      (e, data) => {
          const response = JSON.parse(data.result);
          response.files.map(file => $el.append(`<div class="docs__item">${file.originalFilename}</div>`));
        },
      });

    });
  });
}
