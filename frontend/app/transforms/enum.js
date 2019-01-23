import DS from 'ember-data';
import Enum from '../utils/enum'

export default DS.Transform.extend({
    deserialize(serialized, {options = [], defaultValue = null} = {}) {
        return Enum.create({
            value: serialized || defaultValue,
            options
        });
    },

    serialize(deserialized) {
        if (deserialized instanceof Enum) {
            return deserialized.get('value');
        } else {
            return deserialized;
        }
    }
});
