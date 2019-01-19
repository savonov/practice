import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        createExercise() {
            let exercise = this.store.createRecord('exercise', {
                title: this.exercise.title,
                description: this.exercise.description,
                type: this.exercise.type.value
            });

            exercise.save()
                .then(() => {
                    this.transitionToRoute('exercises')
                })
        }
    }
});
