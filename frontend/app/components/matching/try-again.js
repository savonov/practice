import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  matchButtons: service('match-button'),

  actions: {
    tryAgain(){
      let canvases = $('canvas');

      Array.from(canvases).forEach(canvas => {
        let questionId = $(canvas).data('question');
        let answerId = $(canvas).data('answer');

        let question = $(`#${questionId}`);
        let answer = $(`#${answerId}`);

        let questionTask = $(question).data('task-id');
        let answerTask = $(answer).data('task-id');

        if(questionTask != answerTask){
          $(canvas).remove()
          question.removeClass('match-false');
        };

      });

      this.matchButtons.resetClass()
      this.matchButtons.disableButtons(false);

      this.matchButtons.set('disableSeeAnswers', true)
      this.matchButtons.set('disableTryAgain', true)
      this.matchButtons.set('disableCheck', true)
    },
  }
});
