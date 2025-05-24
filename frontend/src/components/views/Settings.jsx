"use client"

import { useState } from "react"
import { Table, Button, Form, Modal } from "react-bootstrap"
import { Pencil, Trash, Eye, EyeOff, Plus } from "lucide-react"

function Settings({ poles, onSavePassword, onAddPole, onDeletePole }) {
  const [showPassword, setShowPassword] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [currentPole, setCurrentPole] = useState(null)
  const [password, setPassword] = useState("")
  const [newPoleName, setNewPoleName] = useState("")
  const [newPolePassword, setNewPolePassword] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleEditPassword = (pole) => {
    setCurrentPole(pole)
    setPassword(pole.password || "")
    setShowModal(true)
  }

  const handleSavePassword = () => {
    if (currentPole) {
      onSavePassword(currentPole.id, password)
    }
    setShowModal(false)
  }

  const handleAddPole = () => {
    if (newPoleName.trim()) {
      onAddPole({ name: newPoleName, password: newPolePassword })
      setNewPoleName("")
      setNewPolePassword("")
      setShowAddModal(false)
    }
  }

  return (
    <div className="settings-container">
      <h2 className="mb-4">Paramètres</h2>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Gestion des Pôles et Mots de Passe</h5>
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus size={16} className="me-1" /> Ajouter un pôle
          </Button>
        </div>
        <div className="card-body">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nom du Pôle</th>
                <th>Mot de Passe</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {poles.map((pole) => (
                <tr key={pole.id}>
                  <td>{pole.name}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {showPassword[pole.id] ? pole.password || "(Non défini)" : "••••••••"}
                      <Button variant="link" className="p-0 ms-2" onClick={() => togglePasswordVisibility(pole.id)}>
                        {showPassword[pole.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditPassword(pole)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDeletePole(pole.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Edit Password Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPole && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Pôle</Form.Label>
                <Form.Control type="text" value={currentPole.name} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nouveau mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le nouveau mot de passe"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSavePassword}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Pole Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un pôle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom du Pôle</Form.Label>
              <Form.Control
                type="text"
                value={newPoleName}
                onChange={(e) => setNewPoleName(e.target.value)}
                placeholder="Entrez le nom du pôle"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={newPolePassword}
                onChange={(e) => setNewPolePassword(e.target.value)}
                placeholder="Entrez le mot de passe"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddPole}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Settings