import { getOrderList, getOrderStatuses } from '../../js/api';
import Auth from '../../js/Auth';

const $logout = $('.profile__logout');
const $table = $('#profile-table');
const $rows = $table.find('.table__rows');
const $pagination = $('.pagination');

$logout.on('click', () => Auth.logout());

const l10nTypes = {
  TECHNICAL_DOCUMENT: 'Технические',
  LEGAL_DOCUMENT:     'Правоустанавливающие'
};
const types = Object.keys(l10nTypes);

if ($table.length) {
  Auth.getProfile().then(
    ( profile ) => {
      $('.profile__name').html(`${profile.surname || ''} ${profile.name || ''}`);
      $('.profile__bonus').html(profile.bonus);
    },
    () => (window.location = $logout.attr('href'))
  );

  const template = $('.table__template').html();
  const $summary = $('.profile__stats tbody');
  const renderSummary = ( status, count ) => $(`<tr><td>${status}</td><td class="profile__count">${count}</td></tr>`);
  const renderRow = ( data ) => template.replace(/{{(.*?)}}/g, ( placeholder, field ) => data[field]);

  $.when(
    getOrderList(Auth.token),
    getOrderStatuses()
  ).then(( [items], statuses ) => {
    const summary = {};
    statuses.statuses.forEach(status => summary[status] = 0);

    $rows.html('');
    $pagination.html('');
    items
      .map(( item, i ) => ({
        id:        item.id,
        index:     i + 1,
        address:   `${item.address} кв. ${item.flat}`,
        status:    statuses.l10n[item.status] || '',
        paid:      item.paid ? ' Оплачено' : 'Не оплачено<br/><button class="profile__link profile__link--pay">Оплатить</button>',
        documents: generateDocuments(item),
        original:  item,
      }))
      .forEach(( item, i ) => {
          const row = $(renderRow(item));
          $rows.append(row);
          row.find('.profile__link--upload').on('click', ( e ) => {
            e.preventDefault();
            if (item.original.paid) {
              window.location = `${STEP3_URL}?order=${item.id}&done=true`;
              return;
            }
            $.magnificPopup.open({
                items:     {
                  src:  '#popup-payment',
                  type: 'inline'
                },
                callbacks: {
                  open: function () {
                    this.content.find('.button').off('click').on('click', () => {
                      window.location = `${STEP1_URL}?order=${item.id}&done=true`;
                    })
                  }
                }
              }
            );
          });
          row.find('.profile__link--pay').on('click', ( e ) => {
            e.preventDefault();
            window.location = `${STEP1_URL}?order=${item.id}&done=true`;
          });
        }
      )
    ;

    items.forEach(item => summary[item.status]++);
    statuses.statuses.forEach(( status ) => $summary.append(renderSummary(statuses.l10n[status], summary[status])))
  })
  ;

  function generateDocuments( item ) {
    const { attachedFileList } = item;
    let result = '';
    if (Array.isArray(attachedFileList)) {
      const docs = {};

      attachedFileList.forEach(( file ) => {
        const { fileType, originalFilename } = file;
        if (!docs[fileType]) docs[fileType] = [];
        docs[fileType].push(originalFilename);
      });

      types.forEach(( type ) => {
        if (!docs[type]) return;
        result += '<b>' + l10nTypes[type] + ':</b><br>';
        docs[type].forEach(filename => result += filename + '<br>');
      });
    }

    if (result) result += '<br/>';
    result += '<button class="profile__link profile__link--upload">Загрузить</button>';

    return result;
  }
}
