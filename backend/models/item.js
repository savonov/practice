'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    value: DataTypes.STRING,
    task_id: DataTypes.INTEGER
  }, {});
  Item.associate = function (models) {
    Item.hasOne(models.Task, {
      foreignKey: 'answer_id',
      as: 'tasks',
    })
  };
  return Item;
};