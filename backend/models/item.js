'use strict';

// const TaskHasItems = require('./taskhasitems');

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    value: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Item.associate = function (models) {
    Item.belongsToMany(models.Task, {
      as: 'tasks',
      through: models.TaskHasItems,
      foreignKey: 'item_id',
    });
  };
  return Item;
};
