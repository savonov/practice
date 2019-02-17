import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  canvas: service('canvas'),
  matchButtons: service('match-button'),

  actions: {
    seeAnswers(){
      $('canvas').remove();

      this.matchButtons.disableButtons(true);

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

      this.matchButtons.set('disableSeeAnswers', true)
      this.matchButtons.set('disableTryAgain', true)
      this.matchButtons.set('disableCheck', true)
      this.matchButtons.set('disableRestart', false);

      this.matchButtons.resetClass();
    },

  }
});
