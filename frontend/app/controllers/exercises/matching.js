import Controller from '@ember/controller';

export default Controller.extend({
  countTryAgainClick: 0,

  paintMatches(trueMatches, falseMatches){

    if (trueMatches.length != 0) {

      trueMatches.forEach( (match)=> {
        $(match.from).addClass('match-true')
        this.drawLineMatch(trueMatches, '#007e11');
      })
    }

    if (falseMatches.length != 0) {

      falseMatches.forEach( (match)=> {
        $(match.from).addClass('match-false')
        this.drawLineMatch(falseMatches, '#c40000');
      })
    }

  },

  checkAnswer(trueMatches){

    let tmp = this.get('countTryAgainClick') + 1;
    this.set('countTryAgainClick', tmp);

    if (trueMatches.length == $('.button-question').length) {

      this.feedback('Well done!');
      $('.btn-match').prop('disabled', true);
      this.disableButtons(true);
      $('.btn-restart').prop('disabled', false);
    } else {

      if (tmp == 2) {

        $('.btn-seeAnswers').prop('disabled', false);
          $('.btn-check').prop('disabled', true);
          this.disableButtons(true);
          this.feedback('Check the correct answers.');

      } else if (tmp < 2) {

          this.feedback('Try again!');
          this.disableButtons(true);
          $('.btn-check').prop('disabled', true);
          $('.btn-tryAgain').prop('disabled', false);

      }

  }
  },
  checkCountMatch(){
    if ($('canvas').length > 0) {
      $('.btn-check').prop('disabled', false);
    } else {
      $('.btn-check').prop('disabled', true);
    }
  },
  disableButtons(boolean) {
    $('.button-question').prop('disabled', boolean);
    $('.button-answer').prop('disabled', boolean);
  },

  feedback(message){
    $('.feedback').css("display", "flex");
    $('.feedback').children('h5').empty().append(message);
  },

  resetClass(){
    $('.button-answer').attr('class', 'button-answer');
    $('.button-question').attr('class', 'button-question');
  },

  drawLineMatch(arrayOfMatches, color) {
    let canvas = document.createElement("canvas");

    let questionId = arrayOfMatches[0].from.attr('id')
    let answerId = arrayOfMatches[0].to.attr('id')

    $(canvas).attr('data-question', `${questionId}`);
    $(canvas).attr('data-answer', `${answerId}`);

    $(".canvas").append(canvas)

    let ctx = canvas.getContext("2d");

    canvas.width = 1870;
    canvas.height = 1000;
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    arrayOfMatches.forEach((item) => {
      let pos1 = item.from.offset();
      let pos2 =  item.to.offset();

      let eFrom = item.from;
      let eTo =  item.to;

      ctx.beginPath();
      ctx.moveTo(0, pos1.top + eFrom.height() / 2);
      ctx.lineTo(2000, pos2.top + eTo.height() / 2);
      ctx.stroke();

    });

    $('.active-answer').addClass('conected-answer').removeClass('active-answer');

    $('.active-question').addClass('connected-question');
    $('.connected-question').removeClass('active-question').prop('disabled', true);

    this.checkCountMatch();


  },

  addMatch() {
    let activeQuestion = $('.active-question');
    let activeAnswer = $('.active-answer');

    if (activeQuestion.length != 0) {

      let arrayOfMatches = new Array;

      arrayOfMatches.push({
          from: activeQuestion,
          to: activeAnswer
      });

      this.drawLineMatch(arrayOfMatches,  '#DEDEDE');
    }
  },

  actions: {

    seeAnswers(){
      this.send('restart');
      this.disableButtons(true);

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

      this.drawLineMatch(arrayOfMatches, '#FFE16A');

      $('.btn-match').prop('disabled', true);
      $('.btn-restart').prop('disabled', false);

      this.resetClass();
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

        this.checkCountMatch();

      }
    },

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

      this.resetClass()
      this.disableButtons(false);

      $('.btn-match').prop('disabled', true);

    },

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

    closeFeedback(){
      $('.feedback').css('display', 'none')
    },

    restart(){
      $('canvas').remove();
      this.disableButtons(false);
      this.resetClass();
      this.set('countTryAgainClick', 0);
      $('.btn-restart').prop('disabled', true);
    },

    selectQuestion(index) {
      $('.button-question').removeClass('active-question');
      $(`#${index}`).addClass('active-question')
    },

    selectAnswer(index) {
      $('.button-answer').removeClass('active-answer');
      $(`#${index}`).addClass('active-answer')

      this.addMatch();
    },

    answerListFilter(task, item) {
      return item.id == task.answer_id;
    },

    questionListFilter(task, item) {
      return item.id != task.answer_id;
    },
  }
});
