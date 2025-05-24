import React from 'react';
import dayjs from 'dayjs';

function ListePolesNonRemplis({ poles, directors }) {
  const currentMonth = dayjs().month(); // 4 for May (0-based)
  const currentYear = dayjs().year(); // 2025

  // Poles without submissions in the current month
  const polesWithoutSubmissions = poles.filter((pole) => {
    if (!pole.last_submission || pole.last_submission === 'Aucune') return true;
    const submissionDate = dayjs(pole.last_submission);
    return (
      submissionDate.month() !== currentMonth ||
      submissionDate.year() !== currentYear
    );
  });

  const getDirectorName = (directorId) => {
    const director = directors.find((dir) => dir.id === directorId);
    return director ? director.name : 'Non assigné';
  };

  const getLastSubmission = (pole) => {
    return pole.last_submission && pole.last_submission !== 'Aucune'
      ? dayjs(pole.last_submission).format('DD/MM/YYYY')
      : 'Jamais';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h2 className="mb-4">
        <span className="text-danger">❌</span> Pôles en attente
      </h2>

      <div className="alert alert-danger">
        Ces pôles n'ont pas encore soumis leurs rapports pour {dayjs().format('MMMM YYYY')}.
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
                <tr key={pole.id}>
                  <td>{pole.code}</td>
                  <td>{pole.title}</td>
                  <td>{getDirectorName(pole.director_id)}</td>
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
          className="btn btn-primary"
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