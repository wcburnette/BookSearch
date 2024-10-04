// Import the required modules from mongoose and bcrypt
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Import the book schema from Book.js
const bookSchema = require('./Book');

// Define the user schema
const userSchema = new Schema(
  {
    // Username field with validation rules
    username: {
      type: String,
      required: true,  // Username is required
      unique: true,    // Username must be unique
    },
    // Email field with validation rules
    email: {
      type: String,
      required: true,  // Email is required
      unique: true,    // Email must be unique
      match: [/.+@.+\..+/, 'Must use a valid email address'], // Must match the email format
    },
    // Password field with validation rules
    password: {
      type: String,
      required: true,  // Password is required
    },
    // Set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema], // Reference the book schema for saved books
  },
  // Configuration options for the schema
  {
    toJSON: {
      virtuals: true, // Include virtual properties when converting to JSON
    },
  }
);

// Pre-save middleware to hash the user's password before saving
userSchema.pre('save', async function (next) {
  // Check if the password is new or modified
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10; // Define the number of salt rounds for hashing
    // Hash the password and replace the plain text password with the hashed password
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next(); // Proceed to the next middleware or save
});

// Custom method to compare and validate the password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  // Compare the provided password with the hashed password
  return bcrypt.compare(password, this.password);
};

// Virtual property to get the count of saved books
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length; // Return the length of the savedBooks array
});

// Create the User model using the user schema
const User = model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
