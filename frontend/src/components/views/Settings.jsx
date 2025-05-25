
"use client";

import { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Alert } from "react-bootstrap";
import { Pencil, Trash, Eye, EyeOff, Plus } from "lucide-react";
import { poles, addPole, savePolePassword, deletePole, directors } from "../../utils/data";

function Settings() {
  const [poleList, setPoleList] = useState([]);
  const [showPassword, setShowPassword] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPole, setCurrentPole] = useState(null);
  const [password, setPassword] = useState("");
  const [newPoleData, setNewPoleData] = useState({
    code: "",
    intitule: "",
    directeur: "",
    commune: "",
    wilaya: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Sync poles from data.js
  const syncPoles = () => {
    try {
      console.log("Settings: Attempting to load poles from data.js");
      if (!poles || !Array.isArray(poles)) {
        throw new Error("Poles data is undefined or not an array");
      }
      console.log("Settings: Loaded poles", poles);
      setPoleList([...poles]);
      const initialShowPassword = poles.reduce((acc, pole) => ({
        ...acc,
        [pole.code]: false,
      }), {});
      setShowPassword(initialShowPassword);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des pôles. Vérifiez data.js ou le chemin d'import.");
      console.error("Settings: Error syncing poles:", err.message, err.stack);
      setPoleList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Settings: Component mounted, syncing poles");
    syncPoles();
  }, []);

  const togglePasswordVisibility = (code) => {
    console.log(`Settings: Toggling password visibility for pole ${code}`);
    setShowPassword((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleEditPassword = (pole) => {
    console.log(`Settings: Editing password for pole ${pole.code}`);
    setCurrentPole(pole);
    setPassword(pole.password || "");
    setError("");
    setSuccess("");
    setShowEditModal(true);
  };

  const handleSavePassword = () => {
    if (!currentPole) {
      setError("Aucun pôle sélectionné.");
      console.error("Settings: No current pole set");
      return;
    }
    if (!password.trim()) {
      setError("Le mot de passe est requis.");
      console.error("Settings: Empty password");
      return;
    }
    setIsLoading(true);
    try {
      savePolePassword(currentPole.code, password);
      setSuccess(`Mot de passe mis à jour pour ${currentPole.code}.`);
      console.log(`Settings: Saved password for ${currentPole.code}`);
      syncPoles();
      setShowEditModal(false);
      setPassword("");
      setCurrentPole(null);
    } catch (err) {
      setError(err.message || "Erreur lors de la mise à jour du mot de passe.");
      console.error("Settings: Error saving password:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPole = () => {
    const { code, intitule } = newPoleData;
    console.log("Settings: Attempting to add pole", newPoleData);
    if (!code.trim() || !intitule.trim()) {
      setError("Le code et l'intitulé sont requis.");
      console.error("Settings: Missing required fields:", { code, intitule });
      return;
    }
    if (!/P\d{3}/.test(code)) {
      setError("Le code doit être au format PXXX (ex: P103).");
      console.error("Settings: Invalid code format:", code);
      return;
    }
    if (poleList.find(p => p.code === code)) {
      setError(`Un pôle avec le code ${code} existe déjà.`);
      console.error("Settings: Duplicate pole code:", code);
      return;
    }
    setIsLoading(true);
    try {
      addPole(newPoleData);
      setSuccess(`Pôle ${code} ajouté avec succès.`);
      console.log(`Settings: Successfully added pole ${code}`);
      syncPoles();
      setNewPoleData({
        code: "",
        intitule: "",
        directeur: "",
        commune: "",
        wilaya: "",
        password: ""
      });
      setShowAddModal(false);
    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout du pôle.");
      console.error("Settings: Error adding pole:", err.message, err.stack);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePole = (code) => {
    const pole = poleList.find((p) => p.code === code);
    if (!pole) {
      setError("Pôle non trouvé.");
      console.error(`Settings: Pole ${code} not found`);
      return;
    }
    if (window.confirm(`Voulez-vous vraiment supprimer le pôle ${pole.code} ?`)) {
      setIsLoading(true);
      try {
        deletePole(code);
        setSuccess(`Pôle ${pole.code} supprimé avec succès.`);
        console.log(`Settings: Deleted pole ${code}`);
        syncPoles();
      } catch (err) {
        setError(err.message || "Erreur lors de la suppression du pôle.");
        console.error("Settings: Error deleting pole:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPoleData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings-container p-4">
      <h2 className="mb-4">Paramètres</h2>

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Gestion des Pôles et Mots de Passe</h5>
          <Button
            variant="primary"
            size="sm"
            disabled={isLoading}
            onClick={() => {
              setError("");
              setSuccess("");
              setShowAddModal(true);
            }}
          >
            <Plus size={16} className="me-1" /> Ajouter un pôle
          </Button>
        </div>
        <div className="card-body">
          {isLoading ? (
            <p className="text-muted">Chargement des pôles...</p>
          ) : poleList.length === 0 ? (
            <p className="text-muted">Aucun pôle disponible. Vérifiez data.js.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Code du Pôle</th>
                  <th>Mot de Passe</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {poleList.map((pole) => (
                  <tr key={pole.code}>
                    <td>{pole.code}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          {showPassword[pole.code] ? pole.password || "(Non défini)" : "******"}
                        </span>
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => togglePasswordVisibility(pole.code)}
                        >
                          {showPassword[pole.code] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        disabled={isLoading}
                        onClick={() => handleEditPassword(pole)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => handleDeletePole(pole.code)}
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      {/* Edit Password Modal */}
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setPassword("");
          setCurrentPole(null);
          setError("");
          setSuccess("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier le mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPole ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Code du Pôle</Form.Label>
                <Form.Control type="text" value={currentPole.code} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nouveau mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le nouveau mot de passe"
                  isInvalid={!!error && !password.trim()}
                />
                <Form.Control.Feedback type="invalid">
                  Le mot de passe est requis.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          ) : (
            <p>Chargement...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={() => {
              setShowEditModal(false);
              setPassword("");
              setCurrentPole(null);
              setError("");
              setSuccess("");
            }}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={handleSavePassword}
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Pole Modal */}
      <Modal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          setNewPoleData({
            code: "",
            intitule: "",
            directeur: "",
            commune: "",
            wilaya: "",
            password: ""
          });
          setError("");
          setSuccess("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un pôle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Code du Pôle</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={newPoleData.code}
                onChange={handleInputChange}
                placeholder="Ex: P103"
                isInvalid={!!error && !newPoleData.code.trim()}
              />
              <Form.Control.Feedback type="invalid">
                Le code est requis (format: PXXX).
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Intitulé</Form.Label>
              <Form.Control
                type="text"
                name="intitule"
                value={newPoleData.intitule}
                onChange={handleInputChange}
                placeholder="Ex: Pôle Hydraulique"
                isInvalid={!!error && !newPoleData.intitule.trim()}
              />
              <Form.Control.Feedback type="invalid">
                L'intitulé est requis.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Directeur</Form.Label>
              <Form.Select
                name="directeur"
                value={newPoleData.directeur}
                onChange={handleInputChange}
              >
                <option value="">Sélectionner un directeur (facultatif)</option>
                {(directors || []).map((director) => (
                  <option key={director.nom} value={director.nom}>
                    {director.nom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Commune</Form.Label>
              <Form.Control
                type="text"
                name="commune"
                value={newPoleData.commune}
                onChange={handleInputChange}
                placeholder="Ex: Bab Ezzouar"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Wilaya</Form.Label>
              <Form.Control
                type="text"
                name="wilaya"
                value={newPoleData.wilaya}
                onChange={handleInputChange}
                placeholder="Ex: Alger"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mot de passe (facultatif)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newPoleData.password}
                onChange={handleInputChange}
                placeholder="Entrez le mot de passe"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={() => {
              setShowAddModal(false);
              setNewPoleData({
                code: "",
                intitule: "",
                directeur: "",
                commune: "",
                wilaya: "",
                password: ""
              });
              setError("");
              setSuccess("");
            }}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={handleAddPole}
            disabled={isLoading || !newPoleData.code.trim() || !newPoleData.intitule.trim()}
          >
            {isLoading ? "Ajout..." : "Ajouter"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Settings;
