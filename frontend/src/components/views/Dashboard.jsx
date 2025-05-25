import React from 'react';
import dayjs from 'dayjs';
import { getPolesWithSubmissions } from '../../utils/data';

function Dashboard({ setActiveView }) {
  const currentMonth = dayjs().month(); // 4 for May (0-based)
  const currentYear = dayjs().year(); // 2025
  const poles = getPolesWithSubmissions();

  // Filter poles with submissions in the current month
  const polesWithSubmissions = poles.filter((pole) => {
    if (!pole.last_submission || pole.last_submission === 'Aucune') return false;
    const submissionDate = dayjs(pole.last_submission);
    return (
      submissionDate.month() === currentMonth &&
      submissionDate.year() === currentYear
    );
  });

  // Poles without submissions this month
  const polesWithoutSubmissions = poles.filter((pole) => {
    if (!pole.last_submission || pole.last_submission === 'Aucune') return true;
    const submissionDate = dayjs(pole.last_submission);
    return (
      submissionDate.month() !== currentMonth ||
      submissionDate.year() !== currentYear
    );
  });

  const monthName = dayjs().format('MMMM YYYY');

  const handleViewChange = (view) => {
    console.log(`setActiveView called with: ${view}`);
    if (typeof setActiveView === 'function') {
      setActiveView(view);
    } else {
      console.error('setActiveView is not a function:', setActiveView);
      alert('Erreur: Impossible de changer de vue. Contactez le support.');
    }
  };

  return (
    <div className="dashboard">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2>Tableau de Bord</h2>
        <h4 className="text-muted">{monthName}</h4>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="card bg-success text-white h-100"
            onClick={() => handleViewChange('polesWithSubmissions')}
            role="button"
            aria-label="Voir les détails des pôles à jour"
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
            onClick={() => handleViewChange('polesWithoutSubmissions')}
            role="button"
            aria-label="Voir les détails des pôles en attente"
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
                Total des pôles: <strong>{poles.length}</strong>
                <br />
                Taux de conformité:{' '}
                <strong>
                  {poles.length
                    ? Math.round((polesWithSubmissions.length / poles.length) * 100)
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