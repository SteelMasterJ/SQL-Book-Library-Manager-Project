'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}

  Article.init({
    title: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: '"Title" is required'
            }
        }
      },
    author: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: '"Author" is required'
            }
        }
    },
    genre: Sequelize.STRING,
    year: {
        type: Sequelize.INTEGER,
        validate: {
            notNull: {
                msg: 'Please provide a value for "releaseDate"'
            }
        }
    }
  }, { sequelize });

  return Book;
};