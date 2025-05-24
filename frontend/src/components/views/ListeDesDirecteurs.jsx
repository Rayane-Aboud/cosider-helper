import React, { useState } from 'react';
import FormDirecteur from '../forms/FormDirecteur';

function ListeDesDirecteurs({ directors = [], poles = [], onAddDirector }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredDirectors = directors.filter(
    (director) =>
      director.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.phone?.includes(searchTerm)
  );

  const handleAddDirector = (newDirector) => {
    onAddDirector(newDirector);
    setShowForm(false);
  };

  const getAssociatedPoles = (directorId) => {
    const directorPoles = poles.filter((pole) => pole.director_id === directorId);
    return directorPoles.map((pole) => pole.code).join(', ') || 'Aucun pôle associé';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="container">
      <h2 className="mb-4">Liste des directeurs</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher un directeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher un directeur par nom, email ou téléphone"
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
            aria-label="Ajouter un nouveau directeur"
          >
            + Nouveau directeur
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Téléphone</th>
              <th scope="col">Pôles associés</th>
              <th scope="col">Nombre de Pôles</th>
            </tr>
          </thead>
          <tbody>
            {filteredDirectors.length > 0 ? (
              filteredDirectors.map((director) => (
                <tr key={director.id}>
                  <td>{director.name || 'N/A'}</td>
                  <td>{director.email || 'N/A'}</td>
                  <td>{director.phone || 'N/A'}</td>
                  <td>{getAssociatedPoles(director.id)}</td>
                  <td>{poles.filter((pole) => pole.director_id === director.id).length}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Aucun directeur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          onClick={handlePrint}
          aria-label="Imprimer la liste des directeurs"
        >
          Imprimer
        </button>
      </div>

      <FormDirecteur
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleAddDirector}
        poles={poles}
      />
    </div>
  );
}

export default ListeDesDirecteurs;