import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  canvas: service('canvas'),
  matchButton: service('match-button'),

  actions: {
    seeAnswers(){
      $('canvas').remove();

      this.matchButton.disableButtons(true);

      let arrayOfMatches = [];

      let questionButtons = $('.button-question').addClass('connected-question');

      let answerButtons = $('.button-answer').addClass('conected-answer');

      Array.from(questionButtons).forEach(fromItem => {
        Array.from(answerButtons).forEach(toItem => {

          let from = $(fromItem);
          let to = $(toItem);

          if(from.data("task-id") == to.data("task-id")){
            arrayOfMatches.push({
              from: from,
              to: to
            });
          };

        });
      });

      this.canvas.drawLineMatch(arrayOfMatches, '#FFE16A');

      $('.btn-match').prop('disabled', true);
      $('.btn-restart').prop('disabled', false);

      this.matchButton.resetClass();
    },

  }
});
