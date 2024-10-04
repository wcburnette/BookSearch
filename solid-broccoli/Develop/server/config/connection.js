// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB using the URI from environment variables or fallback to the local instance
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// Export the connection object to be used in other parts of the application
module.exports = mongoose.connection;

