export default function() {
  this.namespace = "/api";

  // this.get("/exercises", (schema,request) => {
  //   return
  // });
  this.get("/exercises", function(schema, request) {
    let filtered = [];
    // Type filter
    if (request.queryParams.type !== undefined) {
      let types = schema.exercises.all().filter(function(i) {
        return (
          i.type
            .toLowerCase()
            .indexOf(request.queryParams.type.toLowerCase()) !== -1
        );
      });
      filtered.pushObject(types);
    }
    // title filter
    if (request.queryParams.title !== undefined) {
      let titles = schema.exercises.all().filter(function(i) {
        return (
          i.title
            .toLowerCase()
            .indexOf(request.queryParams.title.toLowerCase()) !== -1
        );
      });
      filtered.pushObject(titles);
    }

    if (filtered.length !== 0) {
      return filtered;
    } else {
      return schema.exercises.all();
    }
  });

  this.get("/exercises/:id");

  this.get("/exercises/:id/tasks", function(schema, request) {
    const exercise_id = request.params.id;
    return schema.tasks.where({ exercise_id: exercise_id });
  });

  this.post("/exercises", function(schema, request) {
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

  this.post("/tasks");
}
