const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Book Schema Definition
 * @type {mongoose.Schema}
 */
const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [50, 'Author name cannot exceed 50 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    publishedDate: {
        type: Date,
        required: [true, 'Published date is required'],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Published date cannot be in the future'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
bookSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;