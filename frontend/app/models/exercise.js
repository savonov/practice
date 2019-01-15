import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  tasks: DS.attr(),
  type_id: DS.attr('number')
});
