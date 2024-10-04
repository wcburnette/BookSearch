// Import necessary hooks and components
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { loginUser } from '../utils/API'; // Import the API utility for user login
import Auth from '../utils/auth'; // Import authentication utilities

// Define the LoginForm component
const LoginForm = () => {
  // State to hold user form data
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false); // State to manage form validation
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  // Handle input changes for form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value }); // Update userFormData state
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await loginUser(userFormData); // Attempt to log in with user data

      // Check if the response is ok; if not, throw an error
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json(); // Extract token and user data from the response
      console.log(user); // Log user information for debugging
      Auth.login(token); // Log the user in using the token
    } catch (err) {
      console.error(err); // Log any errors
      setShowAlert(true); // Show alert if login fails
    }

    // Reset the form fields after submission
    setUserFormData({
      username: '', // Clear username field
      email: '',    // Clear email field
      password: '', // Clear password field
    });
  };

  return (
    <>
      {/* Form component from react-bootstrap */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Alert for login errors */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        
        {/* Email input field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange} // Handle input changes
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
            onChange={handleInputChange} // Handle input changes
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Submit button */}
        <Button
          disabled={!(userFormData.email && userFormData.password)} // Disable button if fields are empty
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

// Export the LoginForm component
export default LoginForm;
