'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.STRING
  }, {});
  Type.associate = function (models) {
    Type.hasMany(models.Exercise, {
      foreignKey: 'type_id',
      as: 'exercises',
    });
  };
  return Type;
};