import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    back() {
      this.exercise.deleteRecord();
      this.transitionToRoute('exercises');
    },

    async createExercise() {
      let exercise = await this.exercise.save();
      this.transitionToRoute('exercises.tasks', exercise.id)
    }
  }
});
