import React from 'react';

function Header({ toggleSidebar }) {
  return (
    <div className="header d-flex align-items-center">
      <button 
        className="btn d-md-none" 
        onClick={toggleSidebar}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="d-flex flex-column align-items-center text-center mx-auto">
        <img className="cosider-logo" src="/Logo_Cosider.png" alt="Logo Cosider" />
        <h2 className="cosider-title m-0">Application Suivi des données de Contrôle de gestion</h2>
      </div>
      
      <div className="text-end">
        <span className="fw-bold">Direction Générale</span>
      </div>
    </div>
  );
}

export default Header;