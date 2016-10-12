// INITIAL MIGRATION
// This is the 0-state of the ramen table.
// When executed, the table will be created.

// This is also what sequelize db:migrate will refer to
// as the base schema. All undos revert to this.

"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('ramen', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.INTEGER
        },
        ramen_name: Sequelize.STRING,
        image: Sequelize.STRING,
        devoured: {type: Sequelize.BOOLEAN, default: false},
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface
      .dropTable('ramen');
  }
};
