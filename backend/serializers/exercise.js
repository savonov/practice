'use strict';
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('exercises', {
  attributes: [
    'title',
    'description',
    'type',
    'tasks',
  ],
  tasks: {
    ref: 'id',
    attributes: [
      'exercise',
      'questions',
      'answers'
    ],
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
  },
  typeForAttribute: (type) => {
    if (type === 'questions' || type === 'answers') {
      return 'items';
    }
    return undefined;
  }
});
