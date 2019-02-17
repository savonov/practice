import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  beforeModel(){
    this.transitionTo('exercises');
  },
    model(){
        return RSVP.hash({
            exercises: this.store.findAll('exercise')
        })
    },

    setupController(controller,model){
        this._super(...arguments);
        controller.set('exercises',model.exercises)
    }
});
