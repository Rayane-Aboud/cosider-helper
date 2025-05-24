import React from 'react';
import dayjs from 'dayjs';

function ListePolesRemplis({ poles, directors }) {
  const currentMonth = dayjs().month(); // 4 for May (0-based)
  const currentYear = dayjs().year(); // 2025

  // Filter poles with submissions in the current month
  const polesWithSubmissions = poles.filter((pole) => {
    if (!pole.last_submission || pole.last_submission === 'Aucune') return false;
    const submissionDate = dayjs(pole.last_submission);
    return (
      submissionDate.month() === currentMonth &&
      submissionDate.year() === currentYear
    );
  });

  const getDirectorName = (directorId) => {
    const director = directors.find((dir) => dir.id === directorId);
    return director ? director.name : 'Non assigné';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h2 className="mb-4">
        <span className="text-success">✅</span> Pôles à jour
      </h2>

      <div className="alert alert-success">
        Ces pôles ont soumis leurs rapports pour {dayjs().format('MMMM YYYY')}.
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
            </tr>
          </thead>
          <tbody>
            {polesWithSubmissions.length > 0 ? (
              polesWithSubmissions.map((pole) => (
                <tr key={pole.id}>
                  <td>{pole.code}</td>
                  <td>{pole.title}</td>
                  <td>{getDirectorName(pole.director_id)}</td>
                  <td>{pole.commune}</td>
                  <td>{pole.wilaya}</td>
                  <td>{dayjs(pole.last_submission).format('DD/MM/YYYY')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Aucun pôle à jour
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
          aria-label="Imprimer la liste des pôles à jour"
        >
          Imprimer
        </button>
      </div>
    </div>
  );
}

export default ListePolesRemplis;