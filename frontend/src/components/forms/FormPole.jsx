import React, { useState } from 'react'

function FormPole({ show, onHide, onSave, directors }) {
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    director_id: '', // Changed to match Laravel naming convention
    commune: '',
    wilaya: '',
    last_submission: null // Changed to snake_case
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Prepare data in the format expected by Laravel
      const submissionData = {
        code: formData.code,
        title: formData.title,
        director_id: formData.director_id,
        commune: formData.commune,
        wilaya: formData.wilaya,
        last_submission: formData.last_submission || new Date().toISOString()
      }
      
      // Call the onSave function which should handle the API call
      const result = await onSave(submissionData)
      
      if (result.success) {
        // Reset form on successful submission
        setFormData({
          code: '',
          title: '',
          director_id: '',
          commune: '',
          wilaya: '',
          last_submission: null
        })
        onHide() // Close the modal
      } else {
        setError(result.error || 'Failed to save pole')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!show) return null

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
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Intitulé</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="director_id" className="form-label">Directeur</label>
                  <select 
                    className="form-select" 
                    id="director_id" 
                    name="director_id"
                    value={formData.director_id}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Sélectionner un directeur</option>
                    {directors.map(director => (
                      <option key={director.id} value={director.id}>
                        {director.name}
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
  )
}

export default FormPole