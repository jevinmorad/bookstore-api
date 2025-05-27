const Book = require('../models/Book');
const createError = require('http-errors');

/**
 * Get all books
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        next(createError(500, 'Failed to fetch books'));
    }
};

/**
 * Create a new book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createBook = async (req, res, next) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        if (err.name === 'ValidationError') {
            next(createError(422, err.message));
        } else {
            next(createError(500, 'Failed to create book'));
        }
    }
};

/**
 * Update a book by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!book) {
            return next(createError(404, 'Book not found'));
        }

        res.json(book);
    } catch (err) {
        if (err.name === 'ValidationError') {
            next(createError(422, err.message));
        } else if (err.name === 'CastError') {
            next(createError(400, 'Invalid book ID'));
        } else {
            next(createError(500, 'Failed to update book'));
        }
    }
};

/**
 * Delete a book by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return next(createError(404, 'Book not found'));
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            next(createError(400, 'Invalid book ID'));
        } else {
            next(createError(500, 'Failed to delete book'));
        }
    }
};