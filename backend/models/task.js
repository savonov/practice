'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    exercise_id: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER
  }, {});
  Task.associate = function (models) {
    Task.hasMany(models.Item, {
      foreignKey: 'task_id',
      as: 'items',
    })

  };
  return Task;
};