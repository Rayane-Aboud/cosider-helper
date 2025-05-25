import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormPole from '../forms/FormPole';
import ConstructionTimesheet from '../chefchantier/form/ConstructionTimesheet';
import FlashMensuel from '../chefchantier/form/FlashMensuel';
import RecapSortieAtelier from '../chefchantier/form/RecapSortieAtelier';
import RecapSortieChaudronnerie from '../chefchantier/form/RecapSortieChaudronnerie';
import WarehouseInventoryForm from '../chefchantier/form/WarehouseInventoryForm';
import { poles, directors, getDocumentsByPole, addDocument } from '../../utils/data';

function ListeDesPoles({ onAddPole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState(null);
  const [selectedPoleCode, setSelectedPoleCode] = useState(null);

  const filteredPoles = poles.filter(
    (pole) =>
      pole.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pole.intitule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pole.commune.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pole.wilaya.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPole = (newPole) => {
    onAddPole(newPole);
    setShowForm(false);
  };

  const getDirectorName = (directorName) => {
    const director = directors.find((d) => d.nom === directorName);
    return director ? director.nom : 'Non assigné';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const formComponents = {
    construction_timesheet: ConstructionTimesheet,
    flash_mensuel: FlashMensuel,
    recap_sortie_atelier: RecapSortieAtelier,
    recap_sortie_chaudronnerie: RecapSortieChaudronnerie,
    warehouse_inventory: WarehouseInventoryForm,
  };

  const formTitles = {
    construction_timesheet: 'Construction Timesheet',
    flash_mensuel: 'Flash Mensuel',
    recap_sortie_atelier: 'Recap Sortie Atelier',
    recap_sortie_chaudronnerie: 'Recap Sortie Chaudronnerie',
    warehouse_inventory: 'Warehouse Inventory',
  };

  const formColors = {
    construction_timesheet: 'blue',
    flash_mensuel: 'green',
    recap_sortie_atelier: 'red',
    recap_sortie_chaudronnerie: 'yellow',
    warehouse_inventory: 'purple',
  };

  const loadFormData = (formType, poleCode) => {
    const poleDocs = getDocumentsByPole(poleCode);
    console.log('poleDocs:', poleDocs); // Debug: Log documents for pole
    const formDocs = poleDocs.filter(doc => doc.type === formType);
    console.log('formDocs:', formDocs); // Debug: Log filtered documents
    // Sort by docId (assuming higher IDs are more recent)
    const latestDoc = formDocs.sort((a, b) => b.id.localeCompare(a.id))[0];
    console.log('latestDoc:', latestDoc); // Debug: Log latest document
    setFormData(latestDoc ? latestDoc.data : {});
    return latestDoc ? latestDoc.id : null;
  };

  const handleDocumentClick = (formType, poleCode) => {
    setSelectedForm(formType);
    setSelectedPoleCode(poleCode);
    const docId = loadFormData(formType, poleCode);
    if (!docId) {
      console.log(`No ${formType} document found for pole ${poleCode}. Loading empty form.`);
    }
    setShowModal(true);
  };

  const handleSave = (updatedData) => {
    const docId = `doc_${Date.now()}`;
    addDocument({
      id: docId,
      type: selectedForm,
      pole: selectedPoleCode,
      data: updatedData,
    });
    setFormData(updatedData);
    alert('Nouveau document ajouté avec succès !');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedForm(null);
    setFormData(null);
    setSelectedPoleCode(null);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Liste des pôles</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher un pôle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher un pôle"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleClearSearch}
              aria-label="Effacer la recherche"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <button
            className="btn btn-outline-danger"
            onClick={() => setShowForm(true)}
            aria-label="Ajouter un nouveau pôle"
          >
            + Nouveau pôle
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Code Pôle</th>
              <th>Intitulé</th>
              <th>Directeur</th>
              <th>Commune</th>
              <th>Wilaya</th>
              <th>Documents</th>
            </tr>
          </thead>
          <tbody>
            {filteredPoles.length > 0 ? (
              filteredPoles.map((pole) => (
                <tr key={pole.code}>
                  <td>{pole.code}</td>
                  <td>{pole.intitule}</td>
                  <td>
                    {getDirectorName(pole.directeur)}
                    {!directors.find((d) => d.nom === pole.directeur) && (
                      <i
                        className="bi bi-exclamation-triangle text-warning ms-2"
                        title="Aucun directeur assigné ou directeur non valide"
                      ></i>
                    )}
                  </td>
                  <td>{pole.commune}</td>
                  <td>{pole.wilaya}</td>
                  <td>
                    <div className="d-flex gap-2">
                      {Object.keys(formComponents).map((formType) => (
                        <button
                          key={formType}
                          className="btn btn-sm"
                          style={{ backgroundColor: formColors[formType], color: 'white' }}
                          onClick={() => handleDocumentClick(formType, pole.code)}
                          aria-label={`Voir ${formTitles[formType]} pour ${pole.intitule}`}
                          title={formTitles[formType]}
                        >
                          <i className="bi bi-file-earmark-text"></i>
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Aucun pôle trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-outline-danger" onClick={handlePrint}>
          Imprimer
        </button>
      </div>

      <FormPole
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleAddPole}
        directors={directors}
      />

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedForm ? formTitles[selectedForm] : 'Loading...'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedForm && selectedPoleCode && (
            (() => {
              const FormComponent = formComponents[selectedForm];
              return (
                <FormComponent 
                  formData={formData} 
                  poleCode={selectedPoleCode} 
                  onSave={handleSave}
                />
              );
            })()
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListeDesPoles;