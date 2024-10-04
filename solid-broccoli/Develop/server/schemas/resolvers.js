// Import the AuthenticationError class to handle authentication errors in GraphQL
const { AuthenticationError } = require('apollo-server-express');
// Import the User model to interact with the user data in the database
const { User } = require('../models');
// Import the signToken function to create JWTs for authenticated users
const { signToken } = require('../utils/auth');

// Define the resolvers for the GraphQL schema
const resolvers = {
  Query: {
    // Resolver to get the current user's data
    me: async (parent, args, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // If authenticated, fetch the user by ID and populate their savedBooks
        return User.findById(context.user._id).populate('savedBooks');
      }
      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    // Resolver to log in a user
    login: async (parent, { email, password }) => {
      // Find the user by email
      const user = await User.findOne({ email });
      // Check if the user exists and if the password is correct
      if (!user || !(await user.isCorrectPassword(password))) {
        // If credentials are incorrect, throw an AuthenticationError
        throw new AuthenticationError('Incorrect credentials');
      }
      // Generate a token for the authenticated user
      const token = signToken(user);
      // Return the token and user information
      return { token, user };
    },
    // Resolver to create a new user
    addUser: async (parent, { username, email, password }) => {
      // Create a new user in the database
      const user = await User.create({ username, email, password });
      // Generate a token for the newly created user
      const token = signToken(user);
      // Return the token and user information
      return { token, user };
    },
    // Resolver to save a book to the user's savedBooks array
    saveBook: async (parent, { input }, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // If authenticated, update the user's savedBooks by pushing the new book into the array
        return User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: input } },
          { new: true }
        );
      }
      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Not logged in');
    },
    // Resolver to remove a book from the user's savedBooks array
    removeBook: async (parent, { bookId }, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // If authenticated, update the user's savedBooks by pulling the specified bookId
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Not logged in');
    },
  },
};

// Export the resolvers for use in the Apollo Server setup
module.exports = resolvers;

