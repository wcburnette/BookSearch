// Load environment variables from .env file
require('dotenv').config(); // Load environment variables for configuration

const express = require('express'); // Import the Express framework
const path = require('path'); // Import path module for file and directory manipulation
const mongoose = require('mongoose'); // Use mongoose for MongoDB connection
const cors = require('cors'); // Import CORS middleware
const { ApolloServer } = require('apollo-server-express'); // Import Apollo Server for GraphQL integration
const { typeDefs } = require('./schemas'); // Ensure you have your GraphQL schema definitions
const resolvers = require('./resolvers'); // Import your GraphQL resolvers
const authMiddleware = require('./utils/auth'); // Import your authentication middleware

const app = express(); // Initialize the Express application
const PORT = process.env.PORT || 3001; // Set the server port, defaulting to 3001

// Middleware for parsing URL-encoded data and JSON
app.use(express.urlencoded({ extended: true })); // Allows Express to parse incoming requests with URL-encoded payloads
app.use(express.json()); // Allows Express to parse incoming requests with JSON payloads
app.use(cors()); // Enable CORS

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build'))); // Serve static files from the React app's build directory
}

// Import user routes
const userRoutes = require('./routes/api/user-routes'); // Ensure correct path to user routes

// Mount user routes
app.use('/api/users', userRoutes);

// Create a new Apollo Server instance with type definitions and resolvers
const server = new ApolloServer({
  typeDefs, // GraphQL schema definitions
  resolvers, // Resolvers for handling GraphQL queries and mutations
  context: ({ req }) => {
    const token = req.headers.authorization || ''; // Extract token from the authorization header
    return { token, user: authMiddleware(req) }; // Attach user data to context using your auth middleware
  },
});

// Create an async function to start the server and connect to MongoDB
const startServer = async () => {
  await server.start(); // Wait for the Apollo Server to start
  server.applyMiddleware({ app }); // Apply the Apollo GraphQL middleware to the Express app

  // Connect to the MongoDB Atlas database using the provided connection string
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://bwhitney:vrOLdhiRoNgqPD3w@cluster0.rjq9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Your MongoDB connection string

  console.log('Connecting to MongoDB URI:', MONGODB_URI); // Log the MongoDB URI for debugging

  try {
    await mongoose.connect(MONGODB_URI); // Connect to MongoDB
    console.log('MongoDB connected successfully'); // Log success message

    // Start the server after the database connection is established
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`); // Log server listening message
      console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`); // Log GraphQL server ready message
    });
  } catch (err) {
    console.error('MongoDB connection error:', err); // Log any errors that occur during connection
  }
};

// Call the async function to start the server
startServer();
