import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  canvas: service('canvas'),
  matchButton: service('match-button'),
  feedbackMessages: service('feedback-messages'),

  paintMatches(trueMatches, falseMatches){

    if (trueMatches.length != 0) {

      trueMatches.forEach( (match)=> {
        $(match.from).addClass('match-true')
        this.canvas.drawLineMatch(trueMatches, '#007e11');
      })
    }

    if (falseMatches.length != 0) {

      falseMatches.forEach( (match)=> {
        $(match.from).addClass('match-false')
        this.canvas.drawLineMatch(falseMatches, '#c40000');
      })
    }

  },
  checkAnswer(trueMatches){

    let tmp = this.matchButton.get('countTryAgainClick') + 1;
    this.matchButton.set('countTryAgainClick', tmp);

    if (trueMatches.length == $('.button-question').length) {
      this.feedbackMessages.message('Well done!');
      $('.btn-match').prop('disabled', true);
      this.matchButton.disableButtons(true);
      $('.btn-restart').prop('disabled', false);
    } else {

      if (tmp == 2) {

        $('.btn-seeAnswers').prop('disabled', false);
          $('.btn-check').prop('disabled', true);
          this.matchButton.disableButtons(true);
          this.feedbackMessages.message('Check the correct answers.');

      } else if (tmp < 2) {

          this.feedbackMessages.message('Try again!');
          this.matchButton.disableButtons(true);
          $('.btn-check').prop('disabled', true);
          $('.btn-tryAgain').prop('disabled', false);

      }

  }
  },
  actions: {
    checkAnswerAndAddMatches(){
      let canvases = $('canvas');

      let trueMatches = []
      let falseMatches = []

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

        if(questionTask == answerTask){
          trueMatches.push({
            from: question,
            to: answer
          });
        }
        else{
          falseMatches.push({
            from: question,
            to: answer
          });
        }

      });

    this.paintMatches(trueMatches, falseMatches)

    this.checkAnswer(trueMatches)

    },
  }
});
