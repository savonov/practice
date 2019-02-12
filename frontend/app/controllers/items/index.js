import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    delete(item) {
      let confirmed = window.confirm(
        'Are you sure to delete this item ?'
      );
      if (confirmed) {
        item.destroyRecord();
      }
    }
  }
});
