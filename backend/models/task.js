'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    exercise_id: DataTypes.INTEGER
  }, {});
  Task.associate = function (models) {};
  return Task;
};