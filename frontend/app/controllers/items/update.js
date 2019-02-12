import Controller from '@ember/controller';
import {assign} from '@ember/polyfills';

export default Controller.extend({

  actions: {
    back() {
      this.transitionToRoute('items');
    },
    async updateItem() {
      let item = await this.store.findRecord('item', this.item.id);
      // assign(item, this.item);
      item.setProperties(this.item);
      item.save()
        .then(() => {
          this.transitionToRoute('items')
        })
        .catch((error) => {
          console.log(error);
        });
      // this.store.findRecord('item', this.item.id)
      //   .then((exercise) => {
      //     exercise.set('title', this.exercise.title);
      //     exercise.set('description', this.exercise.description);
      //     exercise.set('type', this.exercise.type.value);
      //     exercise.save()
      //       .then((savedExercise) => {
      //         this.transitionToRoute('exercises.tasks', savedExercise.id)
      //       })
      //   }).catch((error) => {
      //   console.log(error);
      // })
    }
  }
});
