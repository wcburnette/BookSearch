const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'your_secret_key'; // Change to a more secure secret for production
const expiration = '2h';

module.exports = {
  // Function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // Allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization || '';

    // If there is a token in the authorization header, extract it
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // Verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach user data to the request object
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'Invalid token!' });
    }

    // Send to the next middleware/endpoint
    next();
  },

  // Function to sign a token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
