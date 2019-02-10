import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  matchButton: service('match-button'),

  actions:{
    restart(){
      $('canvas').remove();
      this.matchButton.disableButtons(false);
      this.matchButton.resetClass();
      this.matchButton.set('countTryAgainClick', 0);
      $('.btn-restart').prop('disabled', true);
    }
  }
});
