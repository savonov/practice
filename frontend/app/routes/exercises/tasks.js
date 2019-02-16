import Route from '@ember/routing/route';
import {set} from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  async model(params) {
    return RSVP.hash({
      exercise: await this.store.findRecord('exercise', params.id),
      items: await this.store.findAll('item')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    set(controller, 'exercise', model.exercise);
    set(controller, 'items', model.items);
  }
});
