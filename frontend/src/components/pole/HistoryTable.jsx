import React from 'react';
import { Table, Button } from 'react-bootstrap';

function HistoryTable() {
  // Mock data for the table
  const historyData = [
    { id: 1, fileName: 'Rapport_Mensuel_Janvier.pdf', submissionDate: '15/01/2025' },
    { id: 2, fileName: 'Facture_Fournisseur_A.pdf', submissionDate: '22/01/2025' },
    { id: 3, fileName: 'Plan_Construction_Phase2.dwg', submissionDate: '05/02/2025' },
    { id: 4, fileName: 'Contrat_Sous_Traitant.pdf', submissionDate: '12/02/2025' },
    { id: 5, fileName: 'Rapport_Qualité_Q1.xlsx', submissionDate: '30/03/2025' },
    { id: 6, fileName: 'Planning_Mise_à_Jour.xlsx', submissionDate: '15/04/2025' },
  ];

  return (
    <div className="table-container p-3">
      <Table hover responsive>
        <thead>
          <tr>
            <th>Fichier</th>
            <th>Date de soumission</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((item) => (
            <tr key={item.id}>
              <td>
                <i className={`bi ${item.fileName.endsWith('.pdf') ? 'bi-file-earmark-pdf' : 
                               item.fileName.endsWith('.xlsx') ? 'bi-file-earmark-excel' : 
                               'bi-file-earmark'} me-2 text-danger`}></i>
                {item.fileName}
              </td>
              <td>{item.submissionDate}</td>
              <td className="text-end">
                <Button variant="outline-primary" size="sm" className="me-2">
                  <i className="bi bi-eye"></i>
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <i className="bi bi-download"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HistoryTable;