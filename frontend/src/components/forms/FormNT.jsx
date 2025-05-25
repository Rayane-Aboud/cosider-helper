import React, { useState } from 'react';
import { addNT } from '../../utils/data';

function FormNT({ show, onHide, poles }) {
  const [formData, setFormData] = useState({
    pole: '',
    nt: '',
    intituleNT: ''
  });

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
    setError(null);

    try {
      const submissionData = {
        pole: formData.pole,
        nt: formData.nt,
        intituleNT: formData.intituleNT
      };

      addNT(submissionData);

      setFormData({
        pole: '',
        nt: '',
        intituleNT: ''
      });
      alert('NT ajouté avec succès !');
      onHide();
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement du NT');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nouveau NT</h5>
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
                  <label htmlFor="pole" className="form-label">Pôle</label>
                  <select
                    className="form-select"
                    id="pole"
                    name="pole"
                    value={formData.pole}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner un pôle</option>
                    {poles.map(pole => (
                      <option key={pole.code} value={pole.code}>
                        {pole.intitule}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="nt" className="form-label">NT</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nt"
                    name="nt"
                    value={formData.nt}
                    onChange={handleChange}
                    required
                    placeholder="Ex: NT-2025-102"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="intituleNT" className="form-label">Intitulé NT</label>
                  <input
                    type="text"
                    className="form-control"
                    id="intituleNT"
                    name="intituleNT"
                    value={formData.intituleNT}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Normes Construction"
                  />
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

export default FormNT;