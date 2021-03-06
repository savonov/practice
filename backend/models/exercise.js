'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.STRING,
  }, {});
  Exercise.associate = function (models) {
    Exercise.hasMany(models.Task, {
      foreignKey: 'exercise_id',
      as: 'tasks',
    });
  };
  return Exercise;
};