import { Input } from '../input/input';

const apartInput = new Input({
  $el:          $('.header__apart'),
  searchConfig: { from_bound: { value: "house" } },
});

const addressInput = new Input({
  $el:          $('.header__address'),
  searchConfig: { from_bound: { value: "street" }, restrict_value: true },
  onSelect:     (suggest) => {
    apartInput.searchConfig = {
      from_bound:     { value: "house" },
      restrict_value: true,
      locations:      [{
        kladr_id: suggest.data.kladr_id
      }],
    };
  }
});
