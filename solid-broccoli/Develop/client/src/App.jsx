import React from 'react'; // Import React library
import './App.css'; // Import the CSS file for styling
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Import Apollo Client and related utilities
import { Outlet } from 'react-router-dom'; // Import Outlet for rendering nested routes
import Navbar from './components/Navbar'; // Import the Navbar component

// Initialize Apollo Client for GraphQL interactions
const client = new ApolloClient({
  uri: '/graphql', // Set the URI for the GraphQL server
  cache: new InMemoryCache(), // Use in-memory caching for Apollo Client
});

function App() {
  return (
    // Wrap the application in ApolloProvider to enable GraphQL access
    <ApolloProvider client={client}>
      <Navbar /> {/* Render the Navbar component */}
      <Outlet /> {/* Render nested route components */}
    </ApolloProvider>
  );
}

export default App; // Export the App component as the default export


