import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';

function Sidebar({ collapsed }) {
  const sidebarClass = collapsed ? 'sidebar collapsed' : 'sidebar';
  
  return (
    <div className={sidebarClass}>
      <Nav className="flex-column">
        <NavDropdown 
          title={<>
            <i className="bi bi-file-earmark-text"></i>
            Documents
          </>} 
          id="documents-dropdown"
        >
          <NavDropdown.Item href="#">
            <i className="bi bi-lightning-charge"></i>
            Flash
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <i className="bi bi-grid-3x3"></i>
            Agrégats
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <i className="bi bi-calendar"></i>
            Planning Annuel
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#">
          <i className="bi bi-bell"></i>
          Notifications
        </Nav.Link>
        <Nav.Link href="#">
          <i className="bi bi-paperclip"></i>
          Clasp
        </Nav.Link>
        <Nav.Link href="#">
          <i className="bi bi-clock-history"></i>
          Historique
        </Nav.Link>
        <Nav.Link href="#" className="mt-auto">
          <i className="bi bi-box-arrow-right"></i>
          Déconnexion
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;