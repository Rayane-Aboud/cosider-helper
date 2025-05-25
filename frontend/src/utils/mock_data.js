// src/utils/mock_data.js
export let timesheetData = [
    {
      pole: '',
      mois: '',
      structures: {},
      activities: {}
    }
  ];
  
export function saveTimesheetData(data, poleCode) {
  const newDocId = `doc_${Object.keys(documents).length + 1}`.padStart(7, '0');
  documents[newDocId] = {
    id: newDocId,
    type: 'construction_timesheet',
    pole: poleCode,
    data: {
      mois: data.mois,
      structures: data.structures,
      activities: data.activities
    }
  };
  console.log(`Saved timesheet data for pole ${poleCode}:`, documents[newDocId]);
}