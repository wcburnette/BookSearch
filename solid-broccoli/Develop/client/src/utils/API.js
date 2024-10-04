const serverUrl = 'http://localhost:3001'; // Adjust to your server's URL

// Function to log in a user
export const loginUser = async (userData) => {
  return await fetch(`${serverUrl}/api/users/login`, { // Updated to use correct endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// Function to create a new user
export const createUser = async (userData) => {
  return await fetch(`${serverUrl}/api/users`, { // Correct endpoint for signup
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// Route to get the logged-in user's information (needs the token)
export const getMe = (token) => {
  return fetch(`${serverUrl}/api/users/me`, {
    headers: {
      'Content-Type': 'application/json', // Specify the content type
      authorization: `Bearer ${token}`, // Include the token in the authorization header
    },
  });
};

// Save book data for a logged-in user
export const saveBook = (bookData, token) => {
  return fetch(`${serverUrl}/api/users`, {
    method: 'PUT', // Set the request method to PUT
    headers: {
      'Content-Type': 'application/json', // Specify the content type
      authorization: `Bearer ${token}`, // Include the token in the authorization header
    },
    body: JSON.stringify(bookData), // Convert book data to JSON format
  });
};

// Remove saved book data for a logged-in user
export const deleteBook = (bookId, token) => {
  return fetch(`${serverUrl}/api/users/books/${bookId}`, {
    method: 'DELETE', // Set the request method to DELETE
    headers: {
      authorization: `Bearer ${token}`, // Include the token in the authorization header
    },
  });
};

// Make a search request to the Google Books API
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`); // Fetch from the Google Books API with the query
};


