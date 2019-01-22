import Component from '@ember/component';
import {
  filter
} from '@ember/object/computed';

export default Component.extend({
  answer: filter('item', function (item) {
    return item.id == this.get('answer_id')
  }),
});
