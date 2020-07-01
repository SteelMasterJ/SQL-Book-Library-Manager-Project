'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}

  Book.init({
    title: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "releaseDate"',
            }
        },
      },
    author: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "releaseDate"',
            }
        },
    },
    genre: Sequelize.STRING,
    year: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "releaseDate"',
            }
        },
    },
  }, { sequelize });

  return Book;
};