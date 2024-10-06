// Import jwt-decode to decode the JWT token and extract user information
import decode from 'jwt-decode';

// Create a new class to manage user authentication
class AuthService {
  // Get user data by decoding the token
  getProfile() {
    return decode(this.getToken()); // Decode the token to get user information
  }

  // Check if the user is logged in
  loggedIn() {
    // Checks if there is a saved token and if it's still valid
    const token = this.getToken();
    // Return true if the token exists and is not expired; false otherwise
    return !!token && !this.isTokenExpired(token); // Hand waving here to indicate token validation
  }

  // Check if the provided token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token); // Decode the token to access expiration time
      // Compare expiration time with the current time
      if (decoded.exp < Date.now() / 1000) {
        return true; // Token is expired
      } else return false; // Token is valid
    } catch (err) {
      return false; // If decoding fails, consider the token valid (for safety)
    }
  }

  // Retrieve the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token'); // Fetch the JWT token stored in localStorage
  }

  // Save user token to localStorage upon login
  login(idToken) {
    localStorage.setItem('id_token', idToken); // Store the JWT token
    window.location.assign('/'); // Redirect to the home page
  }

  // Clear user token and profile data from localStorage upon logout
  logout() {
    localStorage.removeItem('id_token'); // Remove the token from localStorage
    // Reload the page to reset the application's state
    window.location.assign('/'); // Redirect to the home page
  }
}

// Export a single instance of the AuthService class
export default new AuthService();
