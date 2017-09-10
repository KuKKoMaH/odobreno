function isParentNode (element, parent) {
  let el = element;
  do {
    if (el === parent) return true;
    el = el.parentElement;
  } while (el);
  return false;
}

const generateSuggest = suggest => $(`<div class="input__suggest">${suggest.value}</div>`);

export class Input {
  constructor ({ $el, onSelect, searchConfig }) {
    this.onSelect = onSelect;
    this.$input = $el.find('.input__input');
    this.$suggestions = $el.find('.input__suggestions');
    this.parent = this.$input.parent()[0];
    this.$body = $(document.body);
    this.searchConfig = searchConfig;

    this.onInput = this.onInput.bind(this);
    this.open = this.open.bind(this);

    this.$input.on('input', this.onInput);
    this.$input.on('focus', this.open);
  }

  onInput (e) {
    this.getAddress(e.target.value, (suggestions) => {
      const $items = suggestions.map((suggest) => {
        const $el = generateSuggest(suggest);
        $el.on('click', () => {
          if (this.onSelect) this.onSelect(suggest);
          this.$input.val(suggest.value);
          this.close();
          this.$suggestions.html('');
        });
        return $el;
      });
      this.$suggestions.html($items);
    });
  }

  open () {
    this.$suggestions.addClass('input__suggestions--active');

    this.$body
      .one('mousedown touchstart', (e) => {
        if (!isParentNode(e.target, this.parent)) this.close();
      })
      .on('keydown.input', (e) => {
        if (e.key === 'Tab') this.close();
      });
  }

  close () {
    this.$body.off('keydown.input');
    this.$suggestions.removeClass('input__suggestions--active');
  }

  getAddress (query, cb) {
    $.ajax({
      method:      'POST',
      url:         'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      headers:     {
        'Accept':        'application/json',
        'Authorization': `Token ${API_KEY}`,
      },
      contentType: 'application/json',
      data:        JSON.stringify({
        ...this.searchConfig,
        query,
        count:      5,
      }),
      dataType:    'json',
      success:     (res) => cb(res.suggestions),
    });
  }
}
