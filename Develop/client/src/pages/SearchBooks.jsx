// Import necessary hooks and components from React and React-Bootstrap
import { useState, useEffect } from 'react'; // Hooks for managing state and side effects
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap'; // Bootstrap components for layout and styling

import Auth from '../utils/auth'; // Authentication utilities
import { saveBook, searchGoogleBooks } from '../utils/API'; // API functions for saving books and searching Google Books
import { saveBookIds, getSavedBookIds } from '../utils/localStorage'; // Functions for managing saved book IDs in localStorage

// Define the SearchBooks component
const SearchBooks = () => {
  // State for holding the returned Google Books API data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // State for holding user input in the search field
  const [searchInput, setSearchInput] = useState('');
  // State for holding error messages
  const [errorMessage, setErrorMessage] = useState('');
  // State for holding saved book ID values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // useEffect hook to save the savedBookIds list to localStorage on component unmount
  useEffect(() => {
    return () => saveBookIds(savedBookIds); // Cleanup function to save book IDs when component unmounts
  }, [savedBookIds]); // Add savedBookIds as a dependency

  // Method to handle book search on form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!searchInput) { // Check if search input is empty
      setErrorMessage('Please enter a search term.');
      return; // Exit if no input
    }

    try {
      // Call the API to search for books based on user input
      const response = await searchGoogleBooks(searchInput);

      // Check if the response has items
      if (!response || !response.length) {
        setErrorMessage('No results found for your search.');
        return;
      }

      // Map the received items to a more usable format
      const bookData = response.map((book) => ({
        bookId: book.id, // Use book ID from Google API
        authors: book.volumeInfo.authors || ['No author to display'], // Get authors or default message
        title: book.volumeInfo.title, // Get book title
        description: book.volumeInfo.description, // Get book description
        image: book.volumeInfo.imageLinks?.thumbnail || '', // Get book image or default to empty
      }));

      setSearchedBooks(bookData); // Update state with searched books
      setSearchInput(''); // Clear search input
      setErrorMessage(''); // Clear any previous error messages
    } catch (err) {
      console.error(err); // Log any errors
      setErrorMessage(err.message || "Something went wrong!"); // Display error message
    }
  };

  // Function to handle saving a book to the database
  const handleSaveBook = async (bookId) => {
    // Find the book in searchedBooks state by matching ID
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // Get authentication token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false; // Exit if no token
    }

    try {
      // Call API to save the book
      const response = await saveBook(bookToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!'); // Handle error response
      }

      // If book successfully saves to user's account, save book ID to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1> {/* Title for the search section */}
          <Form onSubmit={handleFormSubmit}> {/* Form for searching books */}
            <Row>
              <Col xs={12} md={8}> {/* Input field for search */}
                <Form.Control
                  name='searchInput'
                  value={searchInput} // Bind input value to state
                  onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}> {/* Submit button */}
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
          {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Display error message if any */}
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'> {/* Display results title */}
          {searchedBooks.length // Check the number of searched books
            ? `Viewing ${searchedBooks.length} results:` // Show number of results
            : 'Search for a book to begin'} // Prompt to start search
        </h2>
        <Row>
          {searchedBooks.map((book) => { // Map over searchedBooks to display each book
            return (
              <Col md="4" key={book.bookId}> {/* Set key for each column */}
                <Card border='dark'> {/* Card to display book information */}
                  {book.image ? ( // Show book cover if available
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title> {/* Book title */}
                    <p className='small'>Authors: {book.authors.join(', ')}</p> {/* Authors list */}
                    <Card.Text>{book.description}</Card.Text> {/* Book description */}
                    {Auth.loggedIn() && ( // Show save button if user is logged in
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)} // Disable button if book is already saved
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}> {/* Call handleSaveBook on click */}
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!' // Message if book is already saved
                          : 'Save this Book!'} // Button text to save book
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

// Export the SearchBooks component
export default SearchBooks;
