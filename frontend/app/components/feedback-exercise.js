import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  feedbackMessages: service('feedback-messages'),

  actions: {
    closeFeedback(){
      this.feedbackMessages.set('messages', undefined)
    }
  }
});
