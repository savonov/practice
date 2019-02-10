import Service from '@ember/service';

export default Service.extend({
  countTryAgainClick: 0,

  disableButtons(boolean) {
    $('.button-question').prop('disabled', boolean);
    $('.button-answer').prop('disabled', boolean);
  },

  resetClass(){
    $('.button-answer').attr('class', 'button-answer');
    $('.button-question').attr('class', 'button-question');
  },
});
