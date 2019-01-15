'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type_id: DataTypes.INTEGER
  }, {});
  Exercise.associate = function (models) {
    Exercise.hasMany(models.Task, {
      foreignKey: 'exercise_id',
      as: 'tasks',
    })
  };
  return Exercise;
};