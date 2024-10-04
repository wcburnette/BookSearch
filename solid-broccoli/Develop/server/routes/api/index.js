// Import the express router
const router = require('express').Router();
// Import user-related routes from the user-routes file
const userRoutes = require('./user-routes');

// Set up the base route for user-related operations
// All routes in userRoutes will be prefixed with '/users'
router.use('/users', userRoutes);

// Export the router for use in other parts of the application
module.exports = router;

