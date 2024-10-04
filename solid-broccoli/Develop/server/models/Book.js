const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model
// but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  // An array of authors for the saved book
  authors: [
    {
      type: String, // Each author is represented as a string
    },
  ],
  
  // A description of the book, required field
  description: {
    type: String,
    required: true,
  },
  
  // The saved book ID from GoogleBooks, required field
  bookId: {
    type: String,
    required: true,
  },
  
  // A URL to the book's image
  image: {
    type: String,
  },
  
  // A URL link to the book's details or purchase page
  link: {
    type: String,
  },
  
  // The title of the book, required field
  title: {
    type: String,
    required: true,
  },
});

// Export the book schema for use in the User model
module.exports = bookSchema;
