import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { poles, directors, getPolesWithSubmissions } from "../../utils/data";

function ListePolesNonRemplis() {
  const [poleList, setPoleList] = useState([]);
  const [error, setError] = useState("");
  const currentMonth = dayjs().month(); // 4 for May
  const currentYear = dayjs().year(); // 2025

  useEffect(() => {
    console.log("ListePolesNonRemplis: Loading poles");
    try {
      if (!poles || !Array.isArray(poles)) {
        throw new Error("Poles data is undefined or not an array");
      }
      const polesWithSubmissions = getPolesWithSubmissions();
      setPoleList(polesWithSubmissions);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des pôles.");
      console.error("ListePolesNonRemplis: Error loading poles:", err.message, err.stack);
    }
  }, []);

  const polesWithoutSubmissions = poleList.filter((pole) => {
    if (!pole.last_submission || pole.last_submission === "Aucune") return true;
    const submissionDate = dayjs(pole.last_submission);
    return submissionDate.month() !== currentMonth || submissionDate.year() !== currentYear;
  });

  const getDirectorName = (directorName) => {
    const director = directors.find((dir) => dir.nom === directorName);
    return director ? director.nom : "Non assigné";
  };

  const getLastSubmission = (pole) => {
    return pole.last_submission && pole.last_submission !== "Aucune"
      ? dayjs(pole.last_submission).format("DD/MM/YYYY")
      : "Jamais";
  };

  const handlePrint = () => {
    console.log("ListePolesNonRemplis: Printing table");
    window.print();
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="mb-4">
        <span className="text-danger">❌</span> Pôles en attente
      </h2>

      <div className="alert alert-danger">
        Ces pôles n'ont pas encore soumis leurs rapports pour {dayjs().format("MMMM YYYY")}.
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
              <th scope="col">Dernière soumission</th>
            </tr>
          </thead>
          <tbody>
            {polesWithoutSubmissions.length > 0 ? (
              polesWithoutSubmissions.map((pole) => (
                <tr key={pole.code}>
                  <td>{pole.code}</td>
                  <td>{pole.intitule}</td>
                  <td>{getDirectorName(pole.directeur)}</td>
                  <td>{pole.commune}</td>
                  <td>{pole.wilaya}</td>
                  <td>{getLastSubmission(pole)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Tous les pôles sont à jour
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
          aria-label="Imprimer la liste des pôles en attente"
        >
          Imprimer
        </button>
      </div>
    </div>
  );
}

export default ListePolesNonRemplis;