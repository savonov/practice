import Service from '@ember/service';

export default Service.extend({
  countTryAgainClick: 0,
  disableQuestions: false,
  disableAnswers: false,
  disableSeeAnswers: true,
  disableTryAgain: true,
  disableCheck: true,
  disableRestart: true,

  disableButtons(boolean) {
    this.set('disableAnswers', boolean)
    this.set('disableQuestions', boolean)
  },

  resetClass(){
    $('.button-answer').attr('class', 'button-answer');
    $('.button-question').attr('class', 'button-question');
  },
});
