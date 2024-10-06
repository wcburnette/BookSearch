import ReactDOM from 'react-dom/client'; // Import the ReactDOM library for rendering the application
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import router functions from React Router
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

import App from './App.jsx'; // Import the main App component
import SearchBooks from './pages/SearchBooks'; // Import the SearchBooks page component
import SavedBooks from './pages/SavedBooks'; // Import the SavedBooks page component

// Create a router instance using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/', // Define the root path
    element: <App />, // Render the App component at the root path
    errorElement: <h1 className='display-2'>Wrong page!</h1>, // Render this element for any error (e.g., 404)
    children: [ // Define child routes
      {
        index: true, // This route is the default route when the parent route is matched
        element: <SearchBooks /> // Render the SearchBooks component for the index route
      }, 
      {
        path: '/saved', // Define a path for saved books
        element: <SavedBooks /> // Render the SavedBooks component for the /saved route
      }
    ]
  }
]);

// Render the application using ReactDOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} /> // Provide the router to the application
);
