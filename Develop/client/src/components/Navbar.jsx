// Import necessary hooks and components
import { useState } from 'react'; // React hook for managing state
import { Link } from 'react-router-dom'; // Link component for routing
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap'; // Bootstrap components for layout
import SignUpForm from './SignupForm'; // Import the SignUpForm component
import LoginForm from './LoginForm'; // Import the LoginForm component
import Auth from '../utils/auth'; // Import authentication utilities

// Define the AppNavbar component
const AppNavbar = () => {
  // Set modal display state
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the login/signup modal

  return (
    <>
      {/* Navbar component for site navigation */}
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'> {/* Brand name linked to home */}
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' /> {/* Button for mobile navigation */}
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'> {/* Collapsible part of navbar */}
            <Nav className='ml-auto d-flex'>
              <Nav.Link as={Link} to='/'> {/* Link to search page */}
                Search For Books
              </Nav.Link>
              {/* Conditional rendering based on user authentication status */}
              {Auth.loggedIn() ? ( // If the user is logged in
                <>
                  <Nav.Link as={Link} to='/saved'> {/* Link to saved books page */}
                    See Your Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link> {/* Logout link */}
                </>
              ) : ( // If the user is not logged in
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link> // Open modal for login/signup
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Modal for login/signup forms */}
      <Modal
        size='lg' // Large modal size
        show={showModal} // Control modal visibility
        onHide={() => setShowModal(false)} // Close modal when hide is triggered
        aria-labelledby='signup-modal'>
        {/* Tab container for switching between login and signup forms */}
        <Tab.Container defaultActiveKey='login'> {/* Default to login tab */}
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'> {/* Navigation pills for tab selection */}
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link> {/* Login tab */}
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link> {/* Signup tab */}
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              {/* Render LoginForm component in login tab */}
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} /> {/* Close modal after login */}
              </Tab.Pane>
              {/* Render SignUpForm component in signup tab */}
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} /> {/* Close modal after signup */}
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

// Export the AppNavbar component
export default AppNavbar;
