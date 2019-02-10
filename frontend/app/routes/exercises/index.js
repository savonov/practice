import Route from "@ember/routing/route";
import { set } from "@ember/object";
import Ember from 'ember';

export default Route.extend({

  model() {
    return Ember.RSVP.hash({
      exercises: this.store.findAll("exercise"),
      // tasks: this.store.findAll("task"),
      // items: this.store.findAll("item")
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    set(controller, "exercises", model.exercises);
    // set(controller, "tasks", model.tasks);
    // set(controller, "items", model.items);
  }
});
