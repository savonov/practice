import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'localhost:3000',
    namespace: 'api'
});
