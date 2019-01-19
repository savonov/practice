export default function () {

    this.namespace = '/api';

    // this.get('/exercises', () => {
    //     return {
    //         data: [{
    //             type: 'exercises',
    //             id: 1,
    //             attributes: {
    //                 title: "exercise_1",
    //                 type: "match"
    //             }
    //         }, {
    //             type: 'exercises',
    //             id: 2,
    //             attributes: {
    //                 title: "exercise_2",
    //                 type: "match"
    //             }
    //         }]
    //     };
    // });

    // this.get('/exercises', () => {
    //     return {
    //         data: [{
    //             type: 'exercises',
    //             id: 1,
    //             attributes: {
    //                 title: "exercise_1",
    //                 description: "exercise_1 description",
    //                 type: "match",
    //                 tasks: [
    //                     {
    //
    //                     }
    //                 ]
    //             }
    //         }, {
    //             type: 'exercises',
    //             id: 2,
    //             attributes: {
    //                 title: "exercise_2",
    //                 type: "match"
    //             }
    //         }]
    //     };
    // });

    this.get('/exercises');
    this.get('/exercises/:id');

    this.get('/exercises/:id/tasks', function(schema, request) {
        const exercise_id = request.params.id;
        return schema.tasks.where({ exercise_id: exercise_id });
    });

    this.post('/exercises', function(schema, request) {
        let attrs = this.normalizedRequestAttrs();
        /*
          attrs = {
            firstName: 'Conan',
            middleName: 'the',
            lastName: 'Barbarian',
            teamId: '1'
          }
        */
        return schema.exercises.create(attrs);
    });

    this.post('/tasks');
}
