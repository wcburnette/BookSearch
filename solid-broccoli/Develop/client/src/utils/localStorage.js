// Function to get the array of saved book IDs from localStorage
export const getSavedBookIds = () => {
  // Retrieve the 'saved_books' item from localStorage and parse it as JSON
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')) // Parse the JSON string into an array
    : []; // Return an empty array if no saved books found

  return savedBookIds; // Return the array of saved book IDs
};

// Function to save an array of book IDs to localStorage
export const saveBookIds = (bookIdArr) => {
  // Check if the array has any book IDs to save
  if (bookIdArr.length) {
    // Convert the array to a JSON string and save it in localStorage
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    // If the array is empty, remove the 'saved_books' item from localStorage
    localStorage.removeItem('saved_books');
  }
};

// Function to remove a specific book ID from the saved list in localStorage
export const removeBookId = (bookId) => {
  // Retrieve the current array of saved book IDs from localStorage
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books')) // Parse the JSON string into an array
    : null; // If no saved books, set to null

  // If there are no saved book IDs, return false to indicate failure
  if (!savedBookIds) {
    return false;
  }

  // Create a new array that excludes the book ID to be removed
  const updatedSavedBookIds = savedBookIds.filter((savedBookId) => savedBookId !== bookId);
  // Update the localStorage with the new array of saved book IDs
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true; // Return true to indicate successful removal
};
