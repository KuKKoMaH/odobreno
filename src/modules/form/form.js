import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min';
// import { Input } from '../input/input';

// const apartInput = new Input({
//   $el:          $('.form__apart'),
//   searchConfig: { from_bound: { value: "house" } },
// });
//
// const addressInput = new Input({
//   $el:          $('.form__address'),
//   searchConfig: { from_bound: { value: "street" }, restrict_value: true },
//   onSelect:     (suggest) => {
//     apartInput.searchConfig = {
//       from_bound:     { value: "house" },
//       restrict_value: true,
//       locations:      [{
//         kladr_id: suggest.data.kladr_id
//       }],
//     };
//   }
// });

$('.form__date').datepicker({
  language: "ru",
  format:    'dd.mm.yyyy',
  autoclose: true
});
