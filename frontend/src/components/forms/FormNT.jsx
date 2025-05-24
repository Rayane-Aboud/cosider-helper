import React, { useState } from 'react'

function FormNT({ show, onHide, onSave, poles }) {
  const [formData, setFormData] = useState({
    poleId: '',
    code: '',
    title: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    // Reset form
    setFormData({
      poleId: '',
      code: '',
      title: ''
    })
  }

  if (!show) return null

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
                <div className="mb-3">
                  <label htmlFor="poleId" className="form-label">Pôle</label>
                  <select 
                    className="form-select" 
                    id="poleId" 
                    name="poleId"
                    value={formData.poleId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner un pôle</option>
                    {poles.map(pole => (
                      <option key={pole.id} value={pole.id}>
                        {pole.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="code" className="form-label">NT</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="code" 
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Intitulé NT</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
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
  )
}

export default FormNT