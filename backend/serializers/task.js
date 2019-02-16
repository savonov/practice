'use strict';
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('exercises', {
  attributes: [
    'exercise',
    'answers',
    'questions'
  ],
  exercise: {
    ref: 'id',
  },
  questions: {
    ref: 'id',
    attributes: [
      'title',
      'value',
      'type'
    ]
  },
  answers: {
    ref: 'id',
    attributes: [
      'title',
      'value',
      'type'
    ]
  }
});
