import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  matchButtons: service('match-button'),

  actions:{
    restart(){
      $('canvas').remove();
      this.matchButtons.disableButtons(false);
      this.matchButtons.resetClass();
      this.matchButtons.set('countTryAgainClick', 0);
      this.matchButtons.set('disableRestart',true)
    }
  }
});
