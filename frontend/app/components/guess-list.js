import Component from '@ember/component';
import {
  filter
} from '@ember/object/computed';

export default Component.extend({
  filter: filter('exercise', function (exercise) {
    return exercise.type_id === this.get('type_id')
  }),
});
