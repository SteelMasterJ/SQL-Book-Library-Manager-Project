const express = require("express");
const router = express.Router();
const Book = require('../models').Book;

/* GET books page and all books */
router.get('/', asyncHandler(async (req, res) => {
    const books = await Books.findAll({ order: [[ "createdAt", "DESC" ]]});
    res.render("articles/index", { books: books, title: "SQL Library" });
}));

module.exports = router;