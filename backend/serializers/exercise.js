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
    attributes: ['items'],
    items: {
      ref: 'id',
      attributes: ['title', 'value', 'type', 'role']
    }
  }
});
