import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressBook, faCalendarAlt , faInfoCircle, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 

const NavBar = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    logout();  
    navigate('/login');  // Redirect to the login page after logout
  };

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <Navbar.Brand href="#">
        <Link to="/" className="link"><img
          src="src/images/lb-logo.png"
          alt="logo"
          style={{ width: '160px', height: '53px' }}
        /></Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="navbar-nav">
          <Nav.Link href="#" className="nav-link"><Link to="/" className="link"><FontAwesomeIcon icon={faHome} />   Main</Link></Nav.Link>
          <Nav.Link href="#" className="nav-link">
            {user ? (
              <Link to="/book" className="link"><FontAwesomeIcon icon={faCalendarAlt} />   Booking</Link>
            ) : (
              <Link to="/login" className="link"><FontAwesomeIcon icon={faCalendarAlt} />   Booking</Link>
            )}
          </Nav.Link>
          <Nav.Link href="#" className="nav-link"><FontAwesomeIcon icon={faInfoCircle} /><Link className="link">   About</Link></Nav.Link>
          <Nav.Link href="#" className="nav-link"><Link to="/contact" className="link"><FontAwesomeIcon icon={faAddressBook} />   Contact</Link></Nav.Link>
        </Nav>
        <Nav className="ml-auto justify-content-end">
          {user ? (
            <Button variant="light" className="navbar-btn" onClick={handleLogout}><FontAwesomeIcon icon={faSignInAlt} /> Logout</Button>
          ) : (
            <Button variant="light" className="navbar-btn"><FontAwesomeIcon icon={faSignInAlt} /><Link to="/login" className="link">Login/Register</Link></Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
