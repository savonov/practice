import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  matchButtons: service('match-button'),

  actions: {
    //FIXME:  jQuery
    selectQuestion(index) {
      $('.button-question').removeClass('active-question');
      $(`#${index}`).addClass('active-question')
    },
  }
});
