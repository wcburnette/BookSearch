// Import the jsonwebtoken library for creating and verifying JSON Web Tokens
const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'your_secret_key'; // Change to a more secure secret for production
const expiration = '2h'; // Token expiration time set to 2 hours

module.exports = {
  // Middleware function to authenticate routes
  authMiddleware: function (req, res, next) {
    // Allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization || ''; // Initialize token variable

    // If there is a token in the authorization header, extract it
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim(); // Split the token to extract the JWT
    }

    // If no token is found, return an error response
    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // Verify the token and extract user data from it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration }); // Verify the token and get the data
      req.user = data; // Attach user data to the request object for later use
    } catch {
      console.log('Invalid token'); // Log invalid token attempt
      return res.status(400).json({ message: 'Invalid token!' }); // Return an error response if the token is invalid
    }

    // Continue to the next middleware or route handler
    next();
  },

  // Function to sign a token with user information
  signToken: function ({ username, email, _id }) {
    // Create a payload containing user information
    const payload = { username, email, _id };
    // Sign and return a new token using the secret and specifying expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
