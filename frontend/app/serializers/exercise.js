import ApplicationSerializer from './application';
import DS from "ember-data";

export default DS.JSONAPISerializer.extend({});
//
// export default ApplicationSerializer.extend({
//   normalizeResponse(store, primaryModelClass, payload, id, requestType) {
//     payload = {
//       exercises: payload
//     }
//     return this._super(store, primaryModelClass, payload, id, requestType)
//   }
// });


