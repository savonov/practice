import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    back() {
      this.item.deleteRecord();
      this.transitionToRoute('items');
    },

    createItem() {
      this.item.save()
        .then(() => {
          this.transitionToRoute('items')
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
});
