# Books Search Engine with GraphQL

This project is a fully functional Google Books API search engine refactored to use GraphQL with Apollo Server. Built on the MERN stack (MongoDB, Express.js, React.js, Node.js), the application allows users to search for books, save their searches, and manage their saved books through an intuitive user interface.

# Features

- **Search for Books**: Users can search for books using keywords, and the app will display results with title, author, description, image, and a link to the book on Google Books.
- **User Authentication**: Users can sign up and log in to manage their saved books.
- **Save Books**: Users can save books to their account for easy access later.
- **View Saved Books**: Users can view all books they have saved, along with options to remove books from their list.
- **Responsive UI**: The application is designed to be user-friendly and responsive.

## Acceptance Criteria

# User Experience

1. **Landing Page**: 
   - Upon loading the search engine, users are presented with a menu featuring options to search for books and to login/signup.
   - An input field for searching books and a submit button are available.

2. **Search Functionality**:
   - Clicking on "Search for Books" reveals the search input and button.
   - Users can enter search terms and see results that include book details (title, author, description, image, link).

3. **Authentication**:
   - Clicking "Login/Signup" opens a modal allowing toggling between login and signup.
   - The signup form collects username, email, and password.
   - The login form collects email and password.
   - Successful signup logs the user in and closes the modal.
   - Successful login closes the modal and changes menu options.

4. **Managing Saved Books**:
   - When logged in, users can save books, view their saved books, and remove books from their list.
   - Logout resets the menu options back to initial state.

# Technical Specifications

# Back-End Implementation

- **Apollo Server**: Set up to handle GraphQL queries and mutations to fetch and modify data.
- **Authentication Middleware**: Modified to function within the GraphQL context.
- **GraphQL Schemas**: Defined types for Queries and Mutations to manage user and book data:
    - **Query**:
        - `me`: Returns the current User.
    - **Mutation**:
        - `login`: Accepts email and password, returns Auth type.
        - `addUser`: Accepts username, email, and password, returns Auth type.
        - `saveBook`: Accepts book details, returns User type.
        - `removeBook`: Accepts bookId, returns User type.

# Front-End Implementation

- **Apollo Provider**: Wrapped around the application to facilitate GraphQL operations.
- **SearchBooks Component**: Utilizes `useMutation()` to save books.
- **SavedBooks Component**: Uses `useQuery()` to fetch saved books and `useMutation()` to remove books.
- **Signup and Login Forms**: Integrate Apollo mutations to handle user signup and login.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wcburnette/BookSearch.git
   cd books-search-engine
2. **Install Dependencies**
    npm install
3. **Set up environment variables**
    Create a .env file in the root directory and add your MongoDB URI: MONGODB_URI=mongodb://yourMongoDBURI
4. **Start the application**
    npm run develop

# Deployment
The application is deployed on Render. You can access it via the following link: Your Render App

# License
This project is licensed under the MIT License.


### Additional Notes

1. **Repository URL**:`https://github.com/wcburnette/BookSearch.git` 

2. **Render Deployment Link**:`https://booksearch-6b2v.onrender.com`

