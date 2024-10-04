// Import necessary hooks and components
import { useState } from 'react'; // React hook for managing state
import { Form, Button, Alert } from 'react-bootstrap'; // Bootstrap components for form layout

import { createUser } from '../utils/API'; // Import the API function for creating a user
import Auth from '../utils/auth'; // Import authentication utilities

// Define the SignupForm component
const SignupForm = () => {
  // Set initial form state for username, email, and password
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // Set state for form validation (initially not validated)
  const [validated] = useState(false);
  // Set state for alert visibility (initially hidden)
  const [showAlert, setShowAlert] = useState(false);

  // Handle input changes and update userFormData state
  const handleInputChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event target
    setUserFormData({ ...userFormData, [name]: value }); // Update the state with the new value
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if form has valid input (as per react-bootstrap docs)
    const form = event.currentTarget; // Get the current form
    if (form.checkValidity() === false) { // If form is invalid
      event.preventDefault(); // Prevent form submission
      event.stopPropagation(); // Stop event propagation
    }

    try {
      // Call createUser function with userFormData
      const response = await createUser(userFormData);

      if (!response.ok) { // If the response is not okay
        throw new Error('something went wrong!'); // Throw an error
      }

      const { token, user } = await response.json(); // Parse the response JSON
      console.log(user); // Log the user data
      Auth.login(token); // Log the user in using the token
    } catch (err) { // Catch any errors
      console.error(err); // Log the error
      setShowAlert(true); // Show alert for signup failure
    }

    // Reset form data after submission
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        {/* Username input field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Email input field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Password input field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        
        {/* Submit button, disabled if fields are not filled */}
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

// Export the SignupForm component
export default SignupForm;
