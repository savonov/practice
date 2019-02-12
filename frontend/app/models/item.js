import DS from 'ember-data';
import Enum from '../utils/enum';

export default DS.Model.extend({
  title: DS.attr('string'),
  value: DS.attr('string'),
  type: DS.attr('enum', {
    options: [
      'image',
      'audio',
      'text'
    ],
    defaultValue(record, options) {
      return Enum.create(options)
    }
  }),

  taskId: DS.attr('number'),

  role: DS.attr('string'),

  // tasks: DS.hasMany('task')
});
