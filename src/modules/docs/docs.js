import { getParam } from '../../js/history';

const file = document.getElementById('file');
if (file) {
  require.ensure([], () => {
    const Dropzone = require('dropzone');
    new Dropzone(file, { url: '/file/post' });
  });
}

const orderId = getParam('order');