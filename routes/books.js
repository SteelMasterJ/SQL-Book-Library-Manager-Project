const express = require("express");
const router = express.Router();
const Book = require("../models").Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
/* Get all books listing. */
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [[ "createdAt", "DESC" ]]});
    res.render("books/index", { books: books, title: "SQL Library Book Manager" });
}));

/* Create a new book form. */
router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("books/new", { book: {}, title: "New Book" });
  })
);
/* Post create new book. */
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Books.create(req.body);
      res.redirect("/books");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Books.build(req.body);
        res.render("books/new-book", {
          book,
          errors: error.errors,
          title: "New Book",
        });
      } else {
        res.render("books/error");
      }
    }
  })
);
/* Get edit book form. */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    if (book) {
      res.render("books/update-book", { book, title: "Update Book" });
    } else {
      res.render("books/error");
    }
  })
);
/* Post update book. */
router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Books.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
        res.redirect("/books");
      } else {
        res.render("books/error");
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Books.build(req.body);
        book.id = req.params.id;
        res.render("books/new-book", {
          book,
          errors: error.errors,
          title: "New Book",
        });
      } else {
        throw error;
      }
    }
  })
);
/* Post delete book. */
router.post(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.redirect("/books");
    } else {
      res.render("books/error");
    }
  })
);

module.exports = router;