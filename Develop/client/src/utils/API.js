const serverUrl = 'http://localhost:3001'; // Adjust to your server's URL

// Function to log in a user
export const loginUser = async (userData) => {
  return await fetch(`${serverUrl}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// Function to create a new user
export const createUser = async (userData) => {
  return await fetch(`${serverUrl}/api/users`, {
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
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`, // Include the token in the authorization header
    },
  });
};

// Save book data for a logged-in user
export const saveBook = (bookData, token) => {
  return fetch(`${serverUrl}/api/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`, // Include the token in the authorization header
    },
    body: JSON.stringify(bookData),
  });
};

// Remove saved book data for a logged-in user
export const deleteBook = (bookId, token) => {
  return fetch(`${serverUrl}/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`, // Include the token in the authorization header
    },
  });
};

// Enhanced search function with error handling and API key integration
export const searchGoogleBooks = async (query) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);

    console.log('API Response:', response); // Log API response for debugging

    if (response.status === 429) {
      throw new Error('Too many requests. Please wait and try again later.');
    }

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json(); // Get JSON data from response
    const { items } = data; // Destructure items

    if (!items || items.length === 0) {
      throw new Error('No results found for your search.');
    }

    return items; // Return items if successful

  } catch (error) {
    console.error('Error in searchGoogleBooks:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

