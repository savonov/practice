import Controller from "@ember/controller";
import { sort } from "@ember/object/computed";
export default Controller.extend({
  exercises: [],
  sortParam: [],
  sortedExercises: sort("exercises", "sortParam"),

  actions: {
    delete(exercise) {
      let confirmed = window.confirm("Are you sure to delete this exercise ?");
      if (confirmed) {
        exercise.destroyRecord();
      }
    },
    filterAction(param, _sort, search) {
      console.log("sort called with param:", param);
      console.log("sort: ", _sort);
      if (search !== undefined && search !== "") {
        console.log("SEARCH: ", search);

        return this.store.query("exercise", { title: search }).then(results => {
          if (_sort != "") {
            console.log("Sorting+filter");
            this.set("exercises", list);
            this.set("sortParam", [_sort]);
            let sortedExercises = this.get("sortedExercises");
            return { query: param, results: sortedExercises };
          } else {
            return { query: param, results: results };
          }
        });
      }

      if (param.length !== 0) {
        let list = [];
        // param.forEach(item => {
        return this.store.findAll("exercise").then(res => {
          res.forEach(data => {
            if (param.length !== 0)
              param.forEach(param => {
                if (data.type == param) {
                  list.pushObject(data);
                }
              });
          });
          if (_sort != "") {
            console.log("Sorting+filter");
            this.set("exercises", list);
            this.set("sortParam", [_sort]);
            let sortedExercises = this.get("sortedExercises");
            return { query: param, results: sortedExercises };
          } else {
            return { query: param, results: list };
          }
        });
      } else {
        return this.store.findAll("exercise").then(results => {
          if (_sort) {
            console.log("Sorting without filter");
            this.set("exercises", results);
            this.set("sortParam", [_sort]);
            let sortedExercises = this.get("sortedExercises");
            return { query: param, results: sortedExercises };
          } else {
            return { query: param, results: results };
          }
        });
      }
    },
    sortAction(param) {}
  }
});
