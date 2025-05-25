"use client";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import ListePolesRemplis from "./ListePolesRemplis";
import ListePolesNonRemplis from "./ListePolesNonRemplis";
import { poles, directors, getPolesWithSubmissions } from "../../utils/data";

function Dashboard({ setActiveView }) {
  const [view, setView] = useState("main");
  const [poleList, setPoleList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const currentMonth = dayjs().month(); // 4 for May
  const currentYear = dayjs().year(); // 2025
  const monthName = dayjs().format("MMMM YYYY");

  // Load poles
  useEffect(() => {
    console.log("Dashboard: Loading poles");
    try {
      if (!poles || !Array.isArray(poles)) {
        throw new Error("Poles data is undefined or not an array");
      }
      const polesWithSubmissions = getPolesWithSubmissions();
      console.log("Dashboard: Loaded poles", polesWithSubmissions);
      setPoleList(polesWithSubmissions);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des pôles. Vérifiez data.js.");
      console.error("Dashboard: Error loading poles:", err.message, err.stack);
      setPoleList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter poles
  const polesWithSubmissions = poleList.filter((pole) => {
    if (!pole.last_submission || pole.last_submission === "Aucune") return false;
    const submissionDate = dayjs(pole.last_submission);
    return submissionDate.month() === currentMonth && submissionDate.year() === currentYear;
  });

  const polesWithoutSubmissions = poleList.filter((pole) => {
    if (!pole.last_submission || pole.last_submission === "Aucune") return true;
    const submissionDate = dayjs(pole.last_submission);
    return submissionDate.month() !== currentMonth || submissionDate.year() !== currentYear;
  });

  const handleViewChange = (newView) => {
    console.log(`Dashboard: Switching to view ${newView}`);
    setView(newView);
  };

  const handleSettingsClick = () => {
    console.log("Dashboard: Navigating to settings");
    if (typeof setActiveView === "function") {
      setActiveView("settings");
    } else {
      console.error("Dashboard: setActiveView is not a function", setActiveView);
      alert("Erreur: Impossible de naviguer vers Paramètres.");
    }
  };

  if (isLoading) {
    return <div className="dashboard p-4">Chargement des données...</div>;
  }

  if (error) {
    return (
      <div className="dashboard p-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (view === "polesWithSubmissions") {
    return (
      <div className="dashboard p-4">
        <button
          className="btn btn-outline-danger mb-4"
          onClick={() => handleViewChange("main")}
        >
          Retour au Tableau de Bord
        </button>
        <ListePolesRemplis />
      </div>
    );
  }

  if (view === "polesWithoutSubmissions") {
    return (
      <div className="dashboard p-4">
        <button
          className="btn btn-outline-danger mb-4"
          onClick={() => handleViewChange("main")}
        >
          Retour au Tableau de Bord
        </button>
        <ListePolesNonRemplis />
      </div>
    );
  }

  return (
    <div className="dashboard p-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2>Tableau de Bord</h2>
        <div>
          <h4 className="text-muted d-inline-block me-3">{monthName}</h4>
          <button
            className="btn btn-secondary"
            onClick={handleSettingsClick}
          >
            Paramètres
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="card bg-success text-white h-100"
            onClick={() => handleViewChange("polesWithSubmissions")}
            role="button"
            aria-label="Voir les détails des pôles à jour"
            style={{ cursor: "pointer" }}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <h1 className="display-1 mb-0">{polesWithSubmissions.length}</h1>
              <h5 className="mt-3">✅ Pôles à jour</h5>
              <p className="mt-2 mb-0">Cliquez pour voir les détails</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div
            className="card bg-danger text-white h-100"
            onClick={() => handleViewChange("polesWithoutSubmissions")}
            role="button"
            aria-label="Voir les détails des pôles en attente"
            style={{ cursor: "pointer" }}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <h1 className="display-1 mb-0">{polesWithoutSubmissions.length}</h1>
              <h5 className="mt-3">❌ Pôles en attente</h5>
              <p className="mt-2 mb-0">Cliquez pour voir les détails</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Résumé</h5>
              <p className="card-text">
                Total des pôles: <strong>{poleList.length}</strong>
                <br />
                Taux de conformité:{" "}
                <strong>
                  {poleList.length
                    ? Math.round((polesWithSubmissions.length / poleList.length) * 100)
                    : 0}
                  %
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;