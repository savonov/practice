export default function(server) {
    server.create('task', {exercise_id: 1});
    server.createList('exercise', 5);
}
