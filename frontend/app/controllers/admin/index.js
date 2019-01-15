import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    deleteExercise(exercise) {
      let confirmed = window.confirm(
        'Are you sure to delete this exercise ?'
      );
      if (confirmed) {
        exercise.destroyRecord();
      }
    }
  }
});
