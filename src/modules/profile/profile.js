import { getOrderList } from '../../js/api';
import Auth from '../../js/Auth';

const $logout = $('.profile__logout');
const $table = $('#profile-table');
const $rows = $table.find('.table__rows');
const $pagination = $('.pagination');

$logout.on('click', ( e ) => {
  Auth.logout();
});

const l10nStatus = {
  DRAFT:              'Черновик',
  WAIT_CUSTOMER_DATA: 'Ожидание информации',
  MODERATION:         'Проверка документов',
  INSPECTION:         'В работе',
  EXPERT_IN_PROGRESS: 'В работе',
  DONE:               'Завершена',
};

const l10nTypes = {
  TECHNICAL_DOCUMENT: 'Технические',
  LEGAL_DOCUMENT:     'Правоустанавливающие'
};
const types = Object.keys(l10nTypes);

if ($table.length) {
  Auth.getProfile().then(
    ( profile ) => {
      $('.profile__name').html(`${profile.surname} ${profile.name}`);
      $('.profile__bonus').html(profile.bonus);
    },
    () => (window.location = $logout.attr('href'))
  );

  const template = $('.table__template').html();
  const $summary = $('.profile__stats tbody');
  const renderSummary = ( status, count ) => $(`<tr><td>${status}</td><td class="profile__count">${count}</td></tr>`);
  const renderRow = ( data ) => template.replace(/{{(.*?)}}/g, ( placeholder, field ) => data[field]);

  const summary = {};
  for (let status in l10nStatus) summary[l10nStatus[status]] = 0;

  getOrderList(Auth.token).done(( items ) => {
    $rows.html('');
    $pagination.html('');
    items
      .map(( item, i ) => ({
        id:        item.id,
        index:     i + 1,
        address:   `${item.address} кв. ${item.flat}`,
        status:    l10nStatus[item.status] || '',
        paid:      item.paid ? ' Оплачено' : 'Не оплачено',
        documents: generateDocuments(item.attachedFileList)
      }))
      .forEach(( item, i ) => $rows.append(renderRow(item)));

    items.forEach(item => summary[l10nStatus[item.status]]++);
    Object.keys(summary).forEach(( status ) => $summary.append(renderSummary(status, summary[status])))
  });

  function generateDocuments( fileList ) {
    if (!Array.isArray(fileList)) return '';
    const docs = {};
    let result = '';

    fileList.forEach(( file ) => {
      const { fileType, originalFilename } = file;
      if (!docs[fileType]) docs[fileType] = [];
      docs[fileType].push(originalFilename);
    });

    types.forEach(( type ) => {
      if (!docs[type]) return;
      result += '<b>' + l10nTypes[type] + ':</b><br>';
      docs[type].forEach(filename => result += filename + '<br>');
    })
    return result;
  }
}
