// Import the express router
const router = require('express').Router();
// Import user-related controller functions
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller');

// Import authentication middleware for verifying user tokens
const { authMiddleware } = require('../../utils/auth');

// Define routes for user operations

// POST request to create a new user
// PUT request to save a book for the authenticated user
// authMiddleware checks the token and verifies the user
router.route('/').post(createUser).put(authMiddleware, saveBook);

// POST request for user login
router.route('/login').post(login);

// GET request to retrieve the currently logged-in user's information
// authMiddleware checks the token for verification
router.route('/me').get(authMiddleware, getSingleUser);

// DELETE request to remove a book from the logged-in user's saved books
// The book ID is specified in the URL parameter
// authMiddleware checks the token for verification
router.route('/books/:bookId').delete(authMiddleware, deleteBook);

// Export the configured router for use in other parts of the application
module.exports = router;
