'use strict';
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('exercises', {
    attributes: [
        'title',
        'description',
        'type'
    ]
});