import React, { useState } from "react";
import FormPole from "../forms/FormPole";
import { poles, directors } from "../../utils/data";

function ListeDesPoles({ onAddPole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

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
    return director ? director.nom : "Non assigné";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearSearch = () => {
    setSearchTerm("");
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
              <th>Nom</th>
              <th>Directeur</th>
              <th>Commune</th>
              <th>Wilayah</th>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
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
    </div>
  );
}

export default ListeDesPoles;