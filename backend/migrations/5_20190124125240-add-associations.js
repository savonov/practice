'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Tasks',
        'exercise_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Exercises',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ),
      queryInterface.addColumn(
        'TaskHasItems',
        'task_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Tasks',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ),
      queryInterface.addColumn(
        'TaskHasItems',
        'item_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Items',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Tasks',
        'exercise_id'
      ),
      queryInterface.removeColumn(
        'TaskHasItems',
        'task_id'
      ),
      queryInterface.removeColumn(
        'TaskHasItems',
        'item_id'
      )
    ]);
  }
};
