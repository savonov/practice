import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        updateExercise() {
            // let exercise = this.store.findRecord('exercise', this.exercise.id).then((exercise) => {
            //     exercise.set('title', this.exercise.title);
            //     exercise.set('description', this.exercise.description);
            //     exercise.set('type', this.exercise.type.value);
            // });

            // exercise.save()
            //     .then(() => {
            //         this.transitionToRoute('exercises')
            //     })

            let exercise = {
                title: this.exercise.title,
                description: this.exercise.description,
                type: this.exercise.type.value
            };

            $.ajax({
                data: exercise,
                method: 'PUT',
                url: "http://localhost:3000/api/exercises/" + this.exercise.id
            }).then(() => {
                this.transitionToRoute('exercises')
            })
        }
    }
});
