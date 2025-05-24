import React, { useState } from 'react'

function FormDirecteur({ show, onHide, onSave, poles }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    associatedPoles: []
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handlePoleSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
    setFormData({
      ...formData,
      associatedPoles: selectedOptions
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      associatedPoles: []
    })
  }

  if (!show) return null

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
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nom</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Téléphone</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="associatedPoles" className="form-label">
                    Pôles associés (maintenir Ctrl pour sélectionner plusieurs)
                  </label>
                  <select 
                    className="form-select" 
                    id="associatedPoles" 
                    name="associatedPoles"
                    multiple
                    value={formData.associatedPoles}
                    onChange={handlePoleSelection}
                    size="5"
                  >
                    {poles.map(pole => (
                      <option key={pole.id} value={pole.id}>
                        {pole.title}
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
  )
}

export default FormDirecteur