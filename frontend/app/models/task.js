import DS from 'ember-data';

export default DS.Model.extend({
  exerciseId: DS.attr('number'),

  exercise: DS.belongsTo('exercise'),

  isModified: DS.attr('boolean'),

  questions: DS.hasMany('item', {
    async: false
  }),

  answers: DS.hasMany('item', {
    async: false
  })
});
