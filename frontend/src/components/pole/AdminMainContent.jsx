import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from './SearchBar';
import HistoryTable from './HistoryTable';

function AdminMainContent({ sidebarCollapsed }) {
  const contentClass = sidebarCollapsed ? 'content expanded' : 'content';
  
  return (
    <main className={contentClass}>
      <Container fluid>
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className="mb-0">Historique</h1>
            <p className="text-muted">Consultez l'historique des documents soumis</p>
          </Col>
          <Col xs="auto">
            <Button variant="primary" size="lg">
              <i className="bi bi-plus-lg me-1"></i>
              Nouveau Document
            </Button>
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col md={6} lg={4}>
            <SearchBar />
          </Col>
        </Row>
        
        <Row>
          <Col>
            <HistoryTable />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default AdminMainContent;