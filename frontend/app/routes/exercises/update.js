import Route from '@ember/routing/route';
import {set} from '@ember/object';

export default Route.extend({
    model(params) {
        return this.store.findRecord('exercise', params.id);
    },

    setupController(controller, model) {
        set(controller, 'exercise', model);
    }
});
