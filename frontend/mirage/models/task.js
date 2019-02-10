import { Model, hasMany,belongsTo } from "ember-cli-mirage";

export default Model.extend({
  task: belongsTo("exercise"),
  items: hasMany("item")
});
