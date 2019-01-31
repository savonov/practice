'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskHasItems = sequelize.define('TaskHasItems', {
    type: DataTypes.STRING
  }, {});
  TaskHasItems.associate = function(models) {
    // associations can be defined here
  };
  return TaskHasItems;
};