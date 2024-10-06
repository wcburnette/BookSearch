// Import necessary modules and models
const { AuthenticationError } = require('apollo-server-express'); // Error handling for authentication
const { User } = require('../models'); // User model for database interactions
const { signToken } = require('../utils/auth'); // Function to sign and create JWT tokens

// Define the resolvers for the GraphQL schema
const resolvers = {
  Query: {
    // Resolver for the 'me' query to get the logged-in user's info
    me: async (parent, args, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // Fetch and return the user information along with savedBooks
        return User.findById(context.user._id).populate('savedBooks');
      }
      // Throw an error if the user is not logged in
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    // Resolver for the login mutation
    login: async (parent, { email, password }) => {
      // Find user by email
      const user = await User.findOne({ email });
      // Check if user exists and if the password is correct
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect credentials'); // Throw error for incorrect login
      }
      // Sign token for the authenticated user
      const token = signToken(user);
      // Return the token and user information
      return { token, user };
    },
    // Resolver for adding a new user
    addUser: async (parent, { username, email, password }) => {
      // Create a new user in the database
      const user = await User.create({ username, email, password });
      // Sign token for the newly created user
      const token = signToken(user);
      // Return the token and user information
      return { token, user };
    },
    // Resolver for saving a book to the user's savedBooks
    saveBook: async (parent, { input }, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // Update the user's savedBooks by adding the new book input
        return User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: input } }, // Use $push to add the book
          { new: true } // Return the updated user document
        );
      }
      // Throw an error if the user is not logged in
      throw new AuthenticationError('Not logged in');
    },
    // Resolver for removing a book from the user's savedBooks
    removeBook: async (parent, { bookId }, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // Update the user's savedBooks by removing the book with the given bookId
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } }, // Use $pull to remove the book
          { new: true } // Return the updated user document
        );
      }
      // Throw an error if the user is not logged in
      throw new AuthenticationError('Not logged in');
    },
  },
};

// Export the resolvers to be used in the Apollo Server
module.exports = resolvers;

