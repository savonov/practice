import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.attr('string'),
  answer: DS.attr('string'),
  exercise_id: DS.attr('number')
});
