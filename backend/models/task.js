'use strict';

const TaskHasItems = require('./taskhasitems');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    //
  }, {});
  Task.associate = function (models) {
    Task.belongsTo(models.Exercise, {
      foreignKey: 'exercise_id',
      as: 'tasks'
    });
    Task.belongsToMany(models.Item, {
      as: 'items',
      through: models.TaskHasItems,
      foreignKey: 'task_id',
    })
  };
  return Task;
};
