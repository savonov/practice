import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        updateExercise() {
            this.store.findRecord('exercise', this.exercise.id)
                .then((exercise) => {
                    exercise.set('title', this.exercise.title);
                    exercise.set('description', this.exercise.description);
                    exercise.set('type', this.exercise.type.value);
                    exercise.save()
                        .then(() => {
                            this.transitionToRoute('exercises')
                        })
                }).catch((error) => {
                console.log(error);
            })
        }
    }
});
