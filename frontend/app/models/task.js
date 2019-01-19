import DS from 'ember-data';

export default DS.Model.extend({
    // answer: DS.hasOne('item'),
    items: DS.hasMany('item'),
});
