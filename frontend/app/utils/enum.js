import EmberObject from '@ember/object';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { camelize, capitalize } from '@ember/string';
import { equal } from '@ember/object/computed';

export default EmberObject.extend({
    options: [],

    value: null,

    _defineBooleanMethods: on('init', observer('options.[]', function() {
        this.get('options').forEach((option) => {
            this.set(`is${capitalize(camelize(option))}`, equal('value', option));
        });
    })),

    toString() {
        return this.get('value');
    }
});