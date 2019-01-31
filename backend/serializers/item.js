'use strict';
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('items', {
  attributes: [
    'title',
    'value',
    'type'
  ],
});
