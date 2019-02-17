import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  canvas: service('canvas'),
  matchButtons: service('match-button'),
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

    let tmp = this.matchButtons.get('countTryAgainClick') + 1;
    this.matchButtons.set('countTryAgainClick', tmp);

    if (trueMatches.length == $('.button-question').length) {
      this.feedbackMessages.set('messages', 'Well done!');
      this.matchButtons.set('disableSeeAnswers', true)
      this.matchButtons.set('disableTryAgain', true)
      this.matchButtons.set('disableCheck', true)
      this.matchButtons.disableButtons(true);
      this.matchButtons.set('disableRestart', false);
    } else {

      if (tmp == 2) {
        this.matchButtons.set('disableSeeAnswers', false)
        this.matchButtons.set('disableCheck', true);
        this.matchButtons.disableButtons(true);
        this.feedbackMessages.set('messages', 'Check the correct answers.');

      } else if (tmp < 2) {

          this.feedbackMessages.set('messages', 'Try again!');
          this.matchButtons.disableButtons(true);
          this.matchButtons.set('disableCheck', true);
          this.matchButtons.set('disableTryAgain', false);

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
