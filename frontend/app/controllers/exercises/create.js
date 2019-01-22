import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        back() {
            this.exercise.deleteRecord();
            this.transitionToRoute('exercises');
        },

        createExercise() {
            this.exercise.save()
                .then(() => {
                    this.transitionToRoute('exercises')
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
});
