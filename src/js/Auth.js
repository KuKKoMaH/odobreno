import Cookie from 'js-cookie';
import { login, confirm } from './api';

class Auth {
  constructor () {
    const auth = Cookie.get('auth');
    if (auth) {
      const [token, phone] = auth.split('|');
      if (token && phone) {
        this.token = token;
        this.phone = phone;
      }
    }
  }

  auth (phone) {
    // if (this.token && this.phone === phone) return $.Deferred().resolve(this.token);
    return login(phone)
      .then(resp => this.showConfirmPopup(resp.id))
      .then(token => this.setToken(phone, token))
  }

  setToken (phone, token) {
    Cookie.set('auth', `${token}|${phone}`, { expires: 365 });
    this.token = token;
    this.phone = phone;
    return token;
  }

  /**
   * Возвращает токен
   * @param {string} userId
   * @return {Promise.<string>}
   */
  showConfirmPopup (userId) {
    const def = $.Deferred();
    const $popup = $('#popup-confirm');
    const $form = $popup.find('form');
    const $code = $popup.find('.input__input');
    const $error = $popup.find('.popup__error');
    let success = false;

    $.magnificPopup.open({
      items:     { src: '#popup-confirm' },
      type:      'inline',
      callbacks: {
        close: () => {
          $form.off('submit.confirm');
          if (!success) def.reject('auth_reject');
        }
      }
    }, 0);

    $form.on('submit.confirm', (e) => {
      e.preventDefault();
      $error.html('');
      confirm(userId, $code.val()).then((res) => {
        if (!res.correct) return $error.html('Введен неверный код');
        success = true;
        $.magnificPopup.close();
        def.resolve(res.token);
      });
    });

    return def;
  }
}

export default new Auth();