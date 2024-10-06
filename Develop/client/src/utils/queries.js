import { gql } from '@apollo/client';

// Query to get the logged-in user's information
export const GET_ME = gql`
  query me { // The name of the query is 'me'
    me { // Calls the 'me' resolver to fetch user information
      _id // The unique ID of the user
      username // The username of the user
      email // The email address of the user
      savedBooks { // The list of saved books associated with the user
        bookId // The unique ID of each saved book
        authors // The authors of the saved book
        description // The description of the saved book
        title // The title of the saved book
        image // The cover image URL of the saved book
        link // The link to the saved book (usually to its source)
      }
    }
  }
`;

