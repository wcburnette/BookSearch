const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // Use mongoose for MongoDB connection
const db = require('./config/connection'); // Assuming you're using this for your database connection
const routes = require('./routes'); // Import your existing routes
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schemas'); // Ensure you have your GraphQL schema
const resolvers = require('./resolvers'); // Import your resolvers
const authMiddleware = require('./utils/auth'); // Import your authentication middleware

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create a new Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token, user: authMiddleware(req) }; // Attach user to context using your auth middleware
  },
});

// Apply Apollo GraphQL middleware to the Express app
server.applyMiddleware({ app });

// Use the defined routes
app.use(routes);

// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// Optional: If you're using Mongoose for your connection
mongoose.connect('mongodb://localhost:27017/yourDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
