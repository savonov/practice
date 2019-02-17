import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  matchButtons: service('match-button'),


  drawLineMatch(arrayOfMatches, color) {
    let canvas = document.createElement("canvas");

    let questionId = arrayOfMatches[0].from.attr('id');
    let answerId = arrayOfMatches[0].to.attr('id');

    $(canvas).attr('data-question', `${questionId}`);
    $(canvas).attr('data-answer', `${answerId}`);

    $(".canvas").append(canvas);

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

    this.checkCountMatches();


  },
  checkCountMatches(){
    if ($('canvas').length > 0) {
      this.matchButtons.set('disableCheck', false);
    } else {
      this.matchButtons.set('disableCheck', true);
    }
  },
});
