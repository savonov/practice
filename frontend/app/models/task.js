import DS from 'ember-data';

export default DS.Model.extend({
  answer_id: DS.attr('number'),
  task: DS.belongsTo('exercise', {
    async: true
  }),
  items: DS.hasMany('item', {
    async: true
  }),
});
