import Component from '@ember/component';

export default Component.extend({

  actions: {
    closeFeedback(){
      $('.feedback').css('display', 'none')
    }
  }
});
