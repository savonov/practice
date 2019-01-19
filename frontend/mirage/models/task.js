import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
    items: hasMany('item')
});
