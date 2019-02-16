'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    //
  }, {});
  Task.associate = function (models) {
    Task.belongsTo(models.Exercise, {
      foreignKey: 'exercise_id',
      as: 'exercise'
    });
    Task.belongsToMany(models.Item, {
      as: 'questions',
      through: models.TaskHasItems,
      foreignKey: 'task_id',
    });
      Task.belongsToMany(models.Item, {
      as: 'answers',
      through: models.TaskHasItems,
      foreignKey: 'task_id',
    });
  };
  return Task;
};
