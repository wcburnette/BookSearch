// Import necessary hooks and components from React and React-Bootstrap
import { useState, useEffect } from 'react'; // Hooks for managing state and side effects
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap'; // Bootstrap components for layout

import { getMe, deleteBook } from '../utils/API'; // API functions for fetching user data and deleting books
import Auth from '../utils/auth'; // Authentication utilities
import { removeBookId } from '../utils/localStorage'; // Function for removing book IDs from localStorage

// Define the SavedBooks component
const SavedBooks = () => {
  // State for storing user data
  const [userData, setUserData] = useState({});

  // Calculate the length of userData to determine if useEffect() should run again
  const userDataLength = Object.keys(userData).length;

  // useEffect hook to fetch user data when the component mounts or userDataLength changes
  useEffect(() => {
    const getUserData = async () => {
      try {
        // Get token if the user is logged in
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false; // If no token, exit the function
        }

        // Fetch user data using the token
        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!'); // Handle error response
        }

        const user = await response.json(); // Parse the response JSON
        setUserData(user); // Update userData state with fetched data
      } catch (err) {
        console.error(err); // Log any errors
      }
    };

    getUserData(); // Call the function to fetch user data
  }, [userDataLength]); // Dependency array - runs when userDataLength changes

  // Function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null; // Get token if logged in

    if (!token) {
      return false; // If no token, exit the function
    }

    try {
      // Call deleteBook API function with bookId and token
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('something went wrong!'); // Handle error response
      }

      const updatedUser = await response.json(); // Parse updated user data
      setUserData(updatedUser); // Update userData state with the new data
      // Upon successful deletion, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  // If userData hasn't been loaded yet, display a loading message
  if (!userDataLength) {
    return <h2>LOADING...</h2>; // Show loading indicator
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1> {/* Title for the saved books section */}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length // Check the number of saved books
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:` // Display number of saved books
            : 'You have no saved books!'} // Message when no books are saved
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}> {/* Set key for each column */}
                <Card border='dark'> {/* Card to display book information */}
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null} {/* Show book cover if available */}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title> {/* Book title */}
                    <p className='small'>Authors: {book.authors}</p> {/* Authors list */}
                    <Card.Text>{book.description}</Card.Text> {/* Book description */}
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}> {/* Delete button */}
                      Delete this Book!
                    </Button>
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

// Export the SavedBooks component
export default SavedBooks;

