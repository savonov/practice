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
    attributes: ['items', 'answer'],
    items: {
      ref: 'id',
      attributes: ['value', 'type'],
    },
    answer: {
      ref: 'id',
      attributes: ['value', 'type'],
    }
  }
});
