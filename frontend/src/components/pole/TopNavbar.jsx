import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

function TopNavbar({ toggleSidebar }) {
  return (
    <Navbar bg="white" expand="lg" fixed="top" className="py-2">
      <Container fluid>
        <Button 
          variant="light" 
          className="d-md-none me-2" 
          onClick={toggleSidebar}
        >
          <i className="bi bi-list"></i>
        </Button>
        
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <i className="bi bi-building me-2 text-primary" style={{ fontSize: '1.5rem' }}></i>
          <span className="d-none d-sm-inline">Application de gestion de Cosider</span>
          <span className="d-inline d-sm-none">Cosider</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#" className="position-relative me-3 notification-icon">
              <i className="bi bi-bell"></i>
              <span className="notification-badge">3</span>
            </Nav.Link>
            
            <Nav.Link href="#" className="profile-icon d-flex align-items-center">
              <i className="bi bi-person-circle me-1"></i>
              <span className="d-none d-md-inline">Admin</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;