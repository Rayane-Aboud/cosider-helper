import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormPole from '../forms/FormPole';
import ConstructionTimesheet from '../chefchantier/form/ConstructionTimesheet'
import FlashMensuel from '../chefchantier/form/FlashMensuel'
import RecapSortieAtelier from '../chefchantier/form/RecapSortieAtelier'
import RecapSortieChaudronnerie from '../chefchantier/form/RecapSortieChaudronnerie'
import WarehouseInventoryForm from '../chefchantier/form/WarehouseInventoryForm'


function ListeDesPoles({ poles, directors, onAddPole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState(null);
  const [selectedPoleId, setSelectedPoleId] = useState(null);

  const filteredPoles = poles.filter(
    (pole) =>
      pole.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pole.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pole.commune.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pole.wilaya.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPole = (newPole) => {
    onAddPole(newPole);
    setShowForm(false);
  };

  const getDirectorName = (directorId) => {
    const director = directors?.find((dir) => dir.id === directorId) || {};
    return director.name || 'Non assigné';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const formComponents = {
    constructionTimesheet: ConstructionTimesheet,
    flashMensuel: FlashMensuel,
    recapSortieAtelier: RecapSortieAtelier,
    recapSortieChaudronnerie: RecapSortieChaudronnerie,
    warehouseInventoryForm: WarehouseInventoryForm,
  };

  const formEndpoints = {
    constructionTimesheet: 'constructiontimesheet',
    flashMensuel: 'flashmensuel',
    recapSortieAtelier: 'recapsortieatelier',
    recapSortieChaudronnerie: 'recapsortiechaudronnerie',
    warehouseInventoryForm: 'warehouseinventoryform',
  };

  const formTitles = {
    constructionTimesheet: 'Construction Timesheet',
    flashMensuel: 'Flash Mensuel',
    recapSortieAtelier: 'Recap Sortie Atelier',
    recapSortieChaudronnerie: 'Recap Sortie Chaudronnerie',
    warehouseInventoryForm: 'Warehouse Inventory',
  };

  const formColors = {
    constructionTimesheet: 'blue',
    flashMensuel: 'green',
    recapSortieAtelier: 'red',
    recapSortieChaudronnerie: 'yellow',
    warehouseInventoryForm: 'purple',
  };

  const loadFormData = async (formType, poleId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/load-${formEndpoints[formType]}?pole_id=${poleId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to load form data');
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error loading form data:', error);
      setFormData(null);
      alert('Failed to load form data');
    }
  };

  const handleDocumentClick = (formType, poleId) => {
    setSelectedForm(formType);
    setSelectedPoleId(poleId);
    loadFormData(formType, poleId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedForm(null);
    setFormData(null);
    setSelectedPoleId(null);
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
                <tr key={pole.id}>
                  <td>{pole.code}</td>
                  <td>{pole.title}</td>
                  <td>{getDirectorName(pole.director_id)}</td>
                  <td>{pole.commune}</td>
                  <td>{pole.wilaya}</td>
                  <td>
                    <div className="d-flex gap-2">
                      {Object.keys(formComponents).map((formType) => (
                        <button
                          key={formType}
                          className="btn btn-sm"
                          style={{ backgroundColor: formColors[formType], color: 'white' }}
                          onClick={() => handleDocumentClick(formType, pole.id)}
                          aria-label={`Voir ${formTitles[formType]} pour ${pole.title}`}
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
        <button className="btn btn-primary" onClick={handlePrint}>
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
          {selectedForm && formData ? (
            (() => {
              const FormComponent = formComponents[selectedForm];
              return <FormComponent formData={formData} poleId={selectedPoleId} />;
            })()
          ) : (
            <p>Loading form data...</p>
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