import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import dayjs from "dayjs";
import ConstructionTimesheet from "../chefchantier/form/ConstructionTimesheet";
import FlashMensuel from "../chefchantier/form/FlashMensuel";
import RecapSortieAtelier from "../chefchantier/form/RecapSortieAtelier";
import RecapSortieChaudronnerie from "../chefchantier/form/RecapSortieChaudronnerie";
import WarehouseInventoryForm from "../chefchantier/form/WarehouseInventoryForm";
import { poles, directors, getPolesWithSubmissions, getDocumentsByPole } from "../../utils/data";

function ListePolesRemplis() {
  const [poleList, setPoleList] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState(null);
  const [selectedPoleCode, setSelectedPoleCode] = useState(null);
  const currentMonth = dayjs().month(); // 4 for May
  const currentYear = dayjs().year(); // 2025

  const documentTypes = [
    { key: "construction_timesheet", label: "VENTILATIONS DES HEURES TRAVAILLEES" },
    { key: "flash_mensuel", label: "Flash Mensuel" },
    { key: "recap_sortie_atelier", label: "Recap Sortie Atelier" },
    { key: "recap_sortie_chaudronnerie", label: "Recap Sortie Chaudronnerie" },
    { key: "warehouse_inventory", label: "Warehouse Inventory" },
  ];

  const formComponents = {
    construction_timesheet: ConstructionTimesheet,
    flash_mensuel: FlashMensuel,
    recap_sortie_atelier: RecapSortieAtelier,
    recap_sortie_chaudronnerie: RecapSortieChaudronnerie,
    warehouse_inventory: WarehouseInventoryForm,
  };

  const formTitles = {
    construction_timesheet: "VENTILATIONS DES HEURES TRAVAILLEES",
    flash_mensuel: "Flash Mensuel",
    recap_sortie_atelier: "Recap Sortie Atelier",
    recap_sortie_chaudronnerie: "Recap Sortie Chaudronnerie",
    warehouse_inventory: "Warehouse Inventory",
  };

  useEffect(() => {
    console.log("ListePolesRemplis: Loading poles");
    try {
      if (!poles || !Array.isArray(poles)) {
        throw new Error("Poles data is undefined or not an array");
      }
      const polesWithSubmissions = getPolesWithSubmissions();
      console.log("ListePolesRemplis: Loaded poles", polesWithSubmissions);
      setPoleList(polesWithSubmissions);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des pôles.");
      console.error("ListePolesRemplis: Error loading poles:", err.message, err.stack);
    }
  }, []);

  const polesWithSubmissions = poleList.filter((pole) => {
    if (!pole.last_submission || pole.last_submission === "Aucune") return false;
    const submissionDate = dayjs(pole.last_submission);
    return submissionDate.month() === currentMonth && submissionDate.year() === currentYear;
  });

  const getDirectorName = (directorName) => {
    const director = directors.find((dir) => dir.nom === directorName);
    return director ? director.nom : "Non assigné";
  };

  const hasDocument = (poleCode, docType) => {
    const poleDocs = getDocumentsByPole(poleCode);
    return poleDocs.some((doc) => doc.type === docType);
  };

  const loadFormData = (formType, poleCode) => {
    const poleDocs = getDocumentsByPole(poleCode);
    console.log(`ListePolesRemplis: poleDocs for ${poleCode}:`, poleDocs);
    const formDocs = poleDocs.filter((doc) => doc.type === formType);
    console.log(`ListePolesRemplis: formDocs for ${formType}:`, formDocs);
    const latestDoc = formDocs.sort((a, b) => b.id.localeCompare(a.id))[0];
    console.log(`ListePolesRemplis: latestDoc for ${formType}:`, latestDoc);
    setFormData(latestDoc ? latestDoc.data : {});
    return latestDoc ? latestDoc.id : null;
  };

  const handleDocumentClick = (formType, poleCode) => {
    console.log(`ListePolesRemplis: Clicking ${formType} for pole ${poleCode}`);
    setSelectedForm(formType);
    setSelectedPoleCode(poleCode);
    const docId = loadFormData(formType, poleCode);
    if (!docId) {
      console.log(`ListePolesRemplis: No ${formType} document found for pole ${poleCode}. Loading empty form.`);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedForm(null);
    setFormData(null);
    setSelectedPoleCode(null);
  };

  const handlePrint = () => {
    console.log("ListePolesRemplis: Printing table");
    window.print();
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="mb-4">
        <span className="text-success">✅</span> Pôles à jour
      </h2>

      <div className="alert alert-success">
        Ces pôles ont soumis leurs rapports pour {dayjs().format("MMMM YYYY")}.
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Code Pôle</th>
              <th scope="col">Intitulé</th>
              <th scope="col">Directeur</th>
              <th scope="col">Commune</th>
              <th scope="col">Wilaya</th>
              <th scope="col">Date de soumission</th>
              {documentTypes.map((doc) => (
                <th key={doc.key} scope="col">{doc.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {polesWithSubmissions.length > 0 ? (
              polesWithSubmissions.map((pole) => (
                <tr key={pole.code}>
                  <td>{pole.code}</td>
                  <td>{pole.intitule}</td>
                  <td>{getDirectorName(pole.directeur)}</td>
                  <td>{pole.commune}</td>
                  <td>{pole.wilaya}</td>
                  <td>{dayjs(pole.last_submission).format("DD/MM/YYYY")}</td>
                  {documentTypes.map((doc) => (
                    <td
                      key={`${pole.code}-${doc.key}`}
                      className="text-center"
                      onClick={() => handleDocumentClick(doc.key, pole.code)}
                      style={{ cursor: "pointer" }}
                      aria-label={`Voir ${doc.label} pour ${pole.intitule}`}
                    >
                      {hasDocument(pole.code, doc.key) ? "✅" : "❌"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6 + documentTypes.length} className="text-center">
                  Aucun pôle à jour
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
          aria-label="Imprimer la liste des pôles à jour"
        >
          Imprimer
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedForm ? formTitles[selectedForm] : "Chargement..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedForm && selectedPoleCode ? (
            (() => {
              const FormComponent = formComponents[selectedForm];
              return (
                <FormComponent
                  formData={formData || {}}
                  poleCode={selectedPoleCode}
                  onSave={() => console.log("Save not implemented in view mode")}
                />
              );
            })()
          ) : (
            <p>Chargement...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListePolesRemplis;