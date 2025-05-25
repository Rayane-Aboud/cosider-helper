import React, { useState } from 'react';
import FormDirecteur from '../forms/FormDirecteur';
import { directors, poles } from '../../utils/data';

function ListeDesDirecteurs({ onAddDirector }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredDirectors = directors.filter(
    (director) =>
      director.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.telephone?.includes(searchTerm)
  );

  const handleAddDirector = (newDirector) => {
    onAddDirector(newDirector);
    setShowForm(false);
  };

  const getAssociatedPoles = (directorName) => {
    const director = directors.find((d) => d.nom === directorName);
    return director?.polesAssocies?.join(', ') || 'Aucun pôle associé';
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
                <tr key={director.nom}>
                  <td>{director.nom || 'N/A'}</td>
                  <td>{director.email || 'N/A'}</td>
                  <td>{director.telephone || 'N/A'}</td>
                  <td>{getAssociatedPoles(director.nom)}</td>
                  <td>{director.nombrePoles || 0}</td>
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
          className="btn btn-outline-danger"
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