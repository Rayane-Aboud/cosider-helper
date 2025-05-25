
import React, { useState } from 'react';
import { addDirector } from '../../utils/data';

function FormDirecteur({ show, onHide, poles }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    polesAssocies: []
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePoleSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      polesAssocies: selectedOptions
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      const submissionData = {
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        polesAssocies: formData.polesAssocies
      };

      addDirector(submissionData);

      setFormData({
        nom: '',
        email: '',
        telephone: '',
        polesAssocies: []
      });
      alert('Directeur ajouté avec succès !');
      onHide();
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement du directeur');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nouveau Directeur</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onHide}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger mb-3">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Ahmed Zitouni"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Ex: ahmed.z@entreprise.dz"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telephone" className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    placeholder="Ex: +213 555 666 777"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="polesAssocies" className="form-label">
                    Pôles associés (maintenir Ctrl pour sélectionner plusieurs)
                  </label>
                  <select
                    className="form-select"
                    id="polesAssocies"
                    name="polesAssocies"
                    multiple
                    value={formData.polesAssocies}
                    onChange={handlePoleSelection}
                    size="5"
                  >
                    {poles.map(pole => (
                      <option key={pole.code} value={pole.code}>
                        {pole.intitule}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onHide}
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormDirecteur;