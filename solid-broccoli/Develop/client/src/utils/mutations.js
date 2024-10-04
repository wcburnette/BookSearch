import { gql } from '@apollo/client';

// Mutation to log in a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token // The authentication token returned upon successful login
      user { // The user object containing the user's data
        _id // The unique ID of the user
        username // The username of the user
      }
    }
  }
`;

// Mutation to create a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token // The authentication token returned upon successful account creation
      user { // The user object containing the user's data
        _id // The unique ID of the newly created user
        username // The username of the newly created user
      }
    }
  }
`;

// Mutation to save a book to the user's saved books list
export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) { // Input must match the BookInput type defined in the GraphQL schema
      _id // The unique ID of the user
      username // The username of the user
      savedBooks { // The list of saved books for the user
        bookId // The unique ID of the saved book
        authors // The authors of the saved book
        description // The description of the saved book
        title // The title of the saved book
        image // The cover image URL of the saved book
        link // The link to the saved book (usually to its source)
      }
    }
  }
`;

// Mutation to remove a book from the user's saved books list
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) { // The bookId parameter must be the ID of the book to be removed
      _id // The unique ID of the user
      username // The username of the user
      savedBooks { // The updated list of saved books for the user after removal
        bookId // The unique ID of the saved book
      }
    }
  }
`;
