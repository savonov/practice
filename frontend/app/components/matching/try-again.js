import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  matchButton: service('match-button'),

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

      this.matchButton.resetClass()
      this.matchButton.disableButtons(false);

      $('.btn-match').prop('disabled', true);

    },
  }
});
