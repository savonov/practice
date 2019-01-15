import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createExercise() {
      let exercise = this.store.createRecord('exercise', {
        name: this.name,
        description: this.description,
        type_id: this.selectedOption
      })

      exercise.save()
        .then(() => {
          this.transitionToRoute('/admin/index')
        })

    },

    setSelection(selected) {
      this.set('selectedOption', selected)
    },

  }
});
