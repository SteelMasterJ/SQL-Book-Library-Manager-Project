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
    res.render("books", { books: books, title: "SQL Library Book Manager" });
}));

/* Create a new book form. */
router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("newbook", { book: {}, title: "New Book" });
  })
);
/* Post create new book. */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render("newbook", {
          book,
          errors: error.errors,
          title: "New Book",
        });
      } else {
        res.render("errorfourofour");
      }
    }
  })
);
/* Get edit book form. */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("show", { book, title: "Update Book" });
    } else {
      res.render("books/error");
    }
  })
);
/* Post update book. */
router.post(
  "books/:id",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
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
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.redirect("/books");
    } else {
      res.render("books/error");
    }
  })
);

module.exports = router;