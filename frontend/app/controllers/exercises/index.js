import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
export default Controller.extend({
    //ASC id:sort

    // sortedList: sort('exercises', 'sorting'),
    init() {
        this._super(...arguments);
        // this.sorting = ['id:asc'];
    },

    actions: {
        delete(exercise) {
            let confirmed = window.confirm(
                'Are you sure to delete this exercise ?'
            );
            if (confirmed) {
                exercise.destroyRecord();
            }
        }
    }
});
