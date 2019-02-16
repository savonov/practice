import Controller from '@ember/controller';
import {assign} from '@ember/polyfills';

export default Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('items');
    },
    async updateItem() {
      let item = await this.store.findRecord('item', this.item.id);
      item.setProperties(this.item);
      item.save()
        .then(() => {
          this.transitionToRoute('items')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});
