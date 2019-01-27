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
        'Tasks',
        'answer_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Items',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      ),
      queryInterface.addColumn(
        'Items',
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
        'Items',
        'task_id'
      ),
      queryInterface.removeColumn(
        'Items',
        'answer_id'
      )
    ]);
  }
};
