'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    //
  }, {});
  Task.associate = function (models) {
    Task.hasMany(models.Item, {
      foreignKey: 'task_id',
      as: 'items'
    });
    Task.belongsTo(models.Item,{
      foreignKey: 'answer_id',
      as: 'answer'
    });
    Task.belongsTo(models.Exercise, {
      foreignKey: 'exercise_id',
      as: 'tasks'
    });
  };
  return Task;
};
