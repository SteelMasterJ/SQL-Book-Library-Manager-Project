'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}

  Book.init({
    title: {
        type: Sequelize.STRING,
      },
    author: {
        type: Sequelize.STRING,
    },
    genre: Sequelize.STRING,
    year: {
        type: Sequelize.INTEGER,
        // validate: {
        //     notNull: {
        //         msg: 'Please provide a value for "releaseDate"'
        //     }
        // }
    }
  }, { sequelize });

  return Book;
};