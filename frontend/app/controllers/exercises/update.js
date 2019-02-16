import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('exercises');
    },
    updateExercise() {
      this.store.findRecord('exercise', this.exercise.id)
        .then((exercise) => {
          exercise.set('title', this.exercise.title);
          exercise.set('description', this.exercise.description);
          exercise.set('type', this.exercise.type.value);
          exercise.save()
            .then((savedExercise) => {
              this.transitionToRoute('exercises.tasks', savedExercise.id)
            })
        }).catch((error) => {
        console.log(error);
      })
    }
  }
});
