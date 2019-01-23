import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({});

// export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
//   attrs: {
//     tasks: {
//       serialize: 'records',
//       deserialize: 'records'
//     },
//     items: {
//       serialize: 'records',
//       deserialize: 'records'
//     }
//   }
// });

