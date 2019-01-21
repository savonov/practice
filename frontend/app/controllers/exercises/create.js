import Controller from '@ember/controller';

export default Controller.extend({

    actions: {
        createExercise() {
            // let exercise = this.store.createRecord('exercise', {
            //     title: this.exercise.title,
            //     description: this.exercise.description,
            //     type: this.exercise.type.value
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
                method: 'post',
                url: "http://localhost:3000/api/exercises"
            }).then(() => {
                this.transitionToRoute('exercises');
            })
        },
        setSelection(){
            console.log('Setting selection');
            
        }
    }
});
