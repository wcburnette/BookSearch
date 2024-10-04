// Import the express router
const router = require('express').Router();
// Import path module for handling file and directory paths
const path = require('path');
// Import API routes for user and other backend functionalities
const apiRoutes = require('./api');

// Use the imported API routes under the '/api' endpoint
router.use('/api', apiRoutes);

// Serve the React front-end in production
// When no API routes match, send the main index.html file
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Export the configured router for use in the server
module.exports = router;

