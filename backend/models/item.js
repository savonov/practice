'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    value: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Item.associate = function (models) {
    Item.belongsTo(models.Task, {
      foreignKey: 'task_id',
      as: 'items'
    });
    Item.hasOne(models.Task, {
      foreignKey: 'answer_id',
      as: 'answer'
    });
  };
  return Item;
};
