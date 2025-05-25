import React, { useState } from 'react';
import { addPole } from '../../utils/data';

function FormPole({ show, onHide, directors }) {
  const [formData, setFormData] = useState({
    code: '',
    intitule: '',
    directeur: '',
    commune: '',
    wilaya: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submissionData = {
        code: formData.code,
        intitule: formData.intitule,
        directeur: formData.directeur,
        commune: formData.commune,
        wilaya: formData.wilaya
      };

      addPole(submissionData);

      setFormData({
        code: '',
        intitule: '',
        directeur: '',
        commune: '',
        wilaya: ''
      });
      alert('Pôle ajouté avec succès !');
      onHide();
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement du pôle');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nouveau Pôle</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onHide}
                disabled={isSubmitting}
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
                  <label htmlFor="code" className="form-label">Code Pôle</label>
                  <input
                    type="text"
                    className="form-control"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Ex: P103"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="intitule" className="form-label">Intitulé</label>
                  <input
                    type="text"
                    className="form-control"
                    id="intitule"
                    name="intitule"
                    value={formData.intitule}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Ex: Pôle Infrastructure"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="directeur" className="form-label">Directeur</label>
                  <select
                    className="form-select"
                    id="directeur"
                    name="directeur"
                    value={formData.directeur}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Sélectionner un directeur</option>
                    {directors.map(director => (
                      <option key={director.nom} value={director.nom}>
                        {director.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="commune" className="form-label">Commune</label>
                  <input
                    type="text"
                    className="form-control"
                    id="commune"
                    name="commune"
                    value={formData.commune}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Ex: Bab Ezzouar"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="wilaya" className="form-label">Wilaya</label>
                  <input
                    type="text"
                    className="form-control"
                    id="wilaya"
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Ex: Alger"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onHide}
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Enregistrement...
                    </>
                  ) : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPole;