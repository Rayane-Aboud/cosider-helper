import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';

function SearchBar() {
  return (
    <div className="search-container">
      <InputGroup>
        <Form.Control
          placeholder="Période 2025"
          aria-label="Search"
        />
        <Button variant="primary">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;