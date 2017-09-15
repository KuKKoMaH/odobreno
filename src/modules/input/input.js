import 'suggestions-jquery';

export default class Input {
  constructor({ $el, type, onSelect, validator }) {
    this.validator = validator;
    this.$el = $el;
    this.$input = $el.find('.input__input');
    this.$error = $el.find('.input__error');

    this.dirty = false;
    this.errors = [];

    this.validate = this.validate.bind(this);
    this.onInput = this.onInput.bind(this);

    if (type === 'suggestions') {
      this.$input = $el.find('input').suggestions({
        autoSelectFirst: true,
        addon:           'none',
        token:           SUGGEST_KEY,
        type:            'ADDRESS',
        bounds:          'city-house',
        mobileWidth:     767,
        onSelect:        (suggest) => {
          if (onSelect) onSelect(suggest);
          this.validate();
        }
      });
    }

    if (type === 'phone') {
      this.$input.mask('+7 (999) 999-99-99', {
        completed: this.validate
      });
    }

    if (type === 'date') {
      require.ensure([], () => {
        require('bootstrap-datepicker');
        require('bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min');
        this.$input.datepicker({
          language:  'ru',
          format:    'dd.mm.yyyy',
          autoclose: true
        }).on('changeDate', this.validate);
      });
    }

    this.$input.on('blur', this.validate);
    this.$input.on('input', this.onInput);
  }

  onInput(e) {
    if (this.dirty) this.validate();
  }

  validate() {
    this.dirty = true;

    const val = this.$input.val();
    // console.log(val);
    this.errors = [];
    for (const message in this.validator) {
      if (!this.validator[message](val)) this.errors.push(message);
    }

    if (this.errors.length) {
      this.$el.addClass('input--error');
      this.$error.html(this.errors.join(', '));
    } else {
      this.$el.removeClass('input--error');
      this.$error.html('');
    }
  }

  getValue() {
    return this.$input.val();
  }

  isValid() {
    return !this.errors.length;
  }
}
