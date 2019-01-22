import DS from 'ember-data';
import Enum from '../utils/enum'

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  type: DS.attr('enum', {
    options: [
      'matching',
      'typing'
    ],
    value: 'matching',
    defaultValue(record, options) {
      return Enum.create(options)
    }
  }),
  tasks: DS.hasMany('task', {
    async: true
  }),

  //fields for sorting
});
