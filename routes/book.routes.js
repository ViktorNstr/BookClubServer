const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Book = require("../models/Book.model");
const Event = require("../models/Event.model");

//  POST /api/books  -  Creates a new book
router.post("/books", (req, res, next) => {
  const { title, description, author, genre, availability, eventId } = req.body;

  Book.create({ title, description, author, genre, availability, event: eventId })
    .then((newBook) => {
      return Event.findByIdAndUpdate(EventId, {
        $push: { books: newBook._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/books/:bookId  - Retrieves a specific book by id
router.get("/books/:bookId", (req, res, next) => {
  const { bookId } = req.params;

  Book.findById(bookId)
    .then((book) => res.json(book))
    .catch((error) => res.json(error));
});

// PUT  /api/books/:bookId  - Updates a specific book by id
router.put("/books/:bookId", (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Book.findByIdAndUpdate(bookId, req.body, { new: true })
    .then((updatedBook) => res.json(updatedBook))
    .catch((err) => res.json(err));
});

//  DELETE /api/books/:bookId  - Deletes a specific book by id
router.delete("/books/:bookId", (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Book.findByIdAndRemove(bookId)
    .then(() =>
      res.json({ message: `Book with ${bookId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
