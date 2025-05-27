const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/books');

/**
 * GET /books
 * Get all books
 */
router.get('/', getAllBooks);

/**
 * POST /books
 * Create a new book
 */
router.post('/', createBook);

/**
 * PUT /books/:id
 * Update a book by ID
 */
router.put('/:id', updateBook);

/**
 * DELETE /books/:id
 * Delete a book by ID
 */
router.delete('/:id', deleteBook);

module.exports = router;