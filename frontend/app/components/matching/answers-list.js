import Component from '@ember/component';

export default Component.extend({
  actions: {
    answerListFilter(task, item) {
      return item.id == task.answer_id;
    },

  }
});
