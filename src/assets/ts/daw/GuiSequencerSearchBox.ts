/*import * as $ from 'jquery';
import 'jqueryui';

export default function GuiSearchBox(guiSongData, audioSongData, guiTracks, audioTracks) {
  $('#autocomplete').autocomplete({
    source: (request, response) => {
      $.ajax({
        type: 'GET',
        url: '/api/loopTitles.json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: (data) =>
          response($.map(data, (item) =>
            ({
              label: item.name,
              // value: item.duration,
              fullPath: item.url,
              // userNames: item.userNames,
              id: item.id,
              uploadedat: item.updatedAt,
            }))),
      });
    },
    minLength: 0,

    select: function autoCompleteSelect(event, ui) {
      const id = ui.item.id;
      event.preventDefault();
      $('#autocomplete').val('');
      audioTracks.addTrack(id, ui.item.label, ui.item.fullPath);
      $(this).autocomplete('search', '.');
      return ui.item;
    },
  }).focus(function autoCompSelectFocus(event) {
    event.preventDefault();
    $(this).autocomplete('search', '');
  });
};
*/
