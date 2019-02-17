import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  canvas: service('canvas'),
  matchButtons: service('match-button'),

  addMatch() {
    let activeQuestion = $('.active-question');
    let activeAnswer = $('.active-answer');

    if (activeQuestion.length != 0) {

      let arrayOfMatches = [];

      arrayOfMatches.push({
          from: activeQuestion,
          to: activeAnswer
      });

      this.canvas.drawLineMatch(arrayOfMatches,  '#DEDEDE');
    }
  },

  actions: {
    //FIXME: jQuery
    selectAnswer(index) {
      $('.button-answer').removeClass('active-answer');
      $(`#${index}`).addClass('active-answer')

      this.addMatch();
    },

    deleteMatch(answerId){
      if($('.active-question').length == 0){
        let canvasesMatchingWithAnswer = $( `[data-answer='${answerId}']`);

        Array.from(canvasesMatchingWithAnswer).forEach(canvas => {
          $(canvas).remove();

          let questionId = $(canvas).data('question');

          $(`#${questionId}`).prop('disabled', false).removeClass('connected-question');
          $(`#${answerId}`).removeClass('conected-answer');
        });

        this.canvas.checkCountMatches();

      }
    },
  }
});
