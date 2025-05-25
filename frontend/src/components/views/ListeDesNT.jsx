import React, { useState } from 'react';
import FormNT from '../forms/FormNT';
import { nts, poles } from '../../utils/data';

function ListeDesNT({ onAddNT }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredNTs = nts.filter(
    (nt) =>
      nt.nt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nt.intituleNT.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNT = (newNT) => {
    onAddNT(newNT);
    setShowForm(false);
  };

  const getPoleName = (poleCode) => {
    const pole = poles.find((pole) => pole.code === poleCode);
    return pole ? pole.intitule : 'Non associé';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="container">
      <h2 className="mb-4">Liste des NT</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher un NT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher un NT par code ou intitulé"
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
            aria-label="Ajouter un nouveau NT"
          >
            + Nouveau NT
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Pôle</th>
              <th scope="col">NT</th>
              <th scope="col">Intitulé NT</th>
            </tr>
          </thead>
          <tbody>
            {filteredNTs.length > 0 ? (
              filteredNTs.map((nt) => (
                <tr key={nt.nt}>
                  <td>
                    {getPoleName(nt.pole)}
                    {!poles.find((pole) => pole.code === nt.pole) && (
                      <i
                        className="bi bi-exclamation-triangle text-warning ms-2"
                        title="Pôle non valide ou non associé"
                      ></i>
                    )}
                  </td>
                  <td>{nt.nt}</td>
                  <td>{nt.intituleNT}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Aucun NT trouvé
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
          aria-label="Imprimer la liste des NT"
        >
          Imprimer
        </button>
      </div>

      <FormNT
        show={showForm}
        onHide={() => setShowForm(false)}
        onSave={handleAddNT}
        poles={poles}
      />
    </div>
  );
}

export default ListeDesNT;