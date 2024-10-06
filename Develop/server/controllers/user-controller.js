// Import the user model to interact with user data in the database
const { User } = require('../models');

// Import the function to sign a token for authentication
const { signToken } = require('../utils/auth');

module.exports = {
  // Get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      // Search for a user by id (if logged in) or username
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    // If no user is found, send a 400 status with an error message
    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    // Return the found user data
    res.json(foundUser);
  },

  // Create a user, sign a token, and send it back to the client
  async createUser({ body }, res) {
    // Create a new user using the provided body data
    const user = await User.create(body);

    // If user creation fails, send a 400 status with an error message
    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    
    // Sign a token for the newly created user
    const token = signToken(user);
    
    // Return the token and user data to the client
    res.json({ token, user });
  },

  // Login a user, sign a token, and send it back to the client
  async login({ body }, res) {
    // Find a user by either username or email
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

    // If no user is found, send a 400 status with an error message
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    // Check if the provided password is correct
    const correctPw = await user.isCorrectPassword(body.password);

    // If the password is incorrect, send a 400 status with an error message
    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    
    // Sign a token for the logged-in user
    const token = signToken(user);
    
    // Return the token and user data to the client
    res.json({ token, user });
  },

  // Save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // The user comes from `req.user` created in the auth middleware function
  async saveBook({ user, body }, res) {
    console.log(user); // Log the user data for debugging
    try {
      // Update the user's savedBooks field by adding the new book
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true } // Return the updated user and run validators
      );
      // Return the updated user data
      return res.json(updatedUser);
    } catch (err) {
      console.log(err); // Log any errors for debugging
      // If an error occurs, send a 400 status with the error details
      return res.status(400).json(err);
    }
  },

  // Remove a book from the user's `savedBooks` field
  async deleteBook({ user, params }, res) {
    // Update the user's savedBooks field by removing the specified book
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true } // Return the updated user
    );

    // If no user is found, send a 404 status with an error message
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    
    // Return the updated user data
    return res.json(updatedUser);
  },
};
