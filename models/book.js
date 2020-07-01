'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}

  Book.init({
    title: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "Title", a book needs a name like a moth needs a flame.',
            }
        },
      },
    author: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "Author", a ghost didnt write this book!',
            }
        },
    },
    genre: Sequelize.STRING,
    year: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: {
                msg: 'Please provide a value for "releaseDate", all books were released at some point, just guess if you dont know.',
            }
        },
    },
  }, { sequelize });

  return Book;
};