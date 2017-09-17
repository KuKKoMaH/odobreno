import { getOrderList } from '../../js/api';

const $table = $('#profile-table');
const $rows = $table.find('.table__rows');
const $pagination = $('.pagination');

const l10nStatus = {
  DRAFT:              'Черновик',
  VERIFICATION:       'Ожидает проверки документов',
  WAIT_CUSTOMER_DATA: 'Ожидает исправления документов покупателем',
  INSPECTION:         'Назначен осмотр',
  EXPERT_IN_PROGRESS: 'Осмотр проведен',
  DONE:               'Выполнен',
};

if ($table.length) {
  const template = $('.table__template').html();
  const renderRow = (data) => template.replace(/{{(.*?)}}/g, (placeholder, field) => data[field]);

  getOrderList().done((items) => {
    $rows.html('');
    $pagination.html('');
    items
      .map((item, i) => ({
        index:   i + 1,
        address: `${item.address} кв. ${item.flat}`,
        status:  l10nStatus[item.status],
        paid:    item.paid ? 'Оплачено' : 'Оплатить',
      }))
      .forEach((item, i) => $rows.append(renderRow(item)));
  });
}
