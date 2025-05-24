import React, { useState } from 'react';
import FormPole from '../forms/FormPole';

function ListeDesPoles({ poles, directors, onAddPole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

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
              <th>Voir Document</th>
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
                    {pole.document_url ? (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => window.open(pole.document_url, '_blank', 'noopener,noreferrer')}
                        aria-label={`Voir le document pour ${pole.title}`}
                      >
                        Voir
                      </button>
                    ) : (
                      'Aucun document'
                    )}
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
    </div>
  );
}

export default ListeDesPoles;