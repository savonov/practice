import Component from '@ember/component';

export default Component.extend({
  actions: {
    selectQuestion(index) {
      $('.button-question').removeClass('active-question');
      $(`#${index}`).addClass('active-question')
    },
  }
});
