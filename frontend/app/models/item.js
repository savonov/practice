import DS from 'ember-data';
import Enum from '../utils/enum'

export default DS.Model.extend({
    value: DS.attr('string'),
    type: DS.attr('enum', {
        options: [
            'image',
            'audio',
            'text'
        ],
        value:'text',
        defaultValue(record, options) {
            return Enum.create(options)
        }
    }),
});
