import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const ConstructionTimesheet = forwardRef(({ formData: initialFormData, poleCode, onSave }, ref) => {
  const [formData, setFormData] = useState({
    pole: poleCode || '',
    mois: '',
    structures: {},
    activities: {}
  });

  const structures = [
    'GESTION',
    'ATELIER CHAUDRONNERIE',
    'ATELIER MECANIQUE',
    'PARC MATERIEL',
    'STATION DE CONCASSAGE',
    'CENTRALE A BETON',
    'ATELIER ARMATURE',
    'ATELIER COFFRAGE',
    'ATELIER PREFABRICATION',
    'POSTE D\'ENROBAGE',
    'INSTALLATIONS'
  ];

  const activities = [
    'TERRASSEMENTS GENERAUX',
    'TERRASSEMENTS PARTICULIERS',
    'BETON',
    'COFFRAGE',
    'FERRAILLAGE',
    'MACONNERIE',
    'ENROBES NOIRS',
    'CHARPENTE METALLIQUE',
    'FORAGE',
    'VRD',
    'TRAVAUX DIVERS ( Facturés )',
    'TRAVAUX DIVERS ( Non Facturés )',
    'INSTALLATIONS ET REPLI',
    'SECOND OEUVRE'
  ];

  useEffect(() => {
    console.log('ConstructionTimesheet initialFormData:', initialFormData);
    console.log('ConstructionTimesheet poleCode:', poleCode);
    if (initialFormData && Object.keys(initialFormData).length > 0) {
      const transformedActivities = {};
      Object.entries(initialFormData.activities || {}).forEach(([activity, values]) => {
        if (Array.isArray(values)) {
          values.forEach((value, index) => {
            transformedActivities[`${activity}_${index + 1}`] = value.toString() || '';
          });
        }
      });

      setFormData({
        pole: poleCode || initialFormData.pole || '',
        mois: initialFormData.mois || '',
        structures: Object.fromEntries(
          Object.entries(initialFormData.structures || {}).map(([key, value]) => [key, value.toString()])
        ),
        activities: transformedActivities
      });
    } else {
      setFormData({
        pole: poleCode || '',
        mois: '',
        structures: {},
        activities: {}
      });
    }
  }, [initialFormData, poleCode]);

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      const savedActivities = {};
      activities.forEach(activity => {
        const values = [1, 2, 3, 4, 5].map(col => {
          const key = `${activity}_${col}`;
          return formData.activities[key] ? parseFloat(formData.activities[key]) || 0 : 0;
        });
        if (values.some(val => val !== 0)) {
          savedActivities[activity] = values;
        }
      });

      return {
        pole: formData.pole,
        mois: formData.mois,
        structures: Object.fromEntries(
          Object.entries(formData.structures).filter(([_, value]) => value)
        ),
        activities: savedActivities
      };
    }
  }));

  const handleInputChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleHeaderChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.pole || !formData.mois) {
      alert('Veuillez remplir les champs Pôle et Mois.');
      return;
    }

    const savedActivities = {};
    activities.forEach(activity => {
      const values = [1, 2, 3, 4, 5].map(col => {
        const key = `${activity}_${col}`;
        return formData.activities[key] ? parseFloat(formData.activities[key]) || 0 : 0;
      });
      if (values.some(val => val !== 0)) {
        savedActivities[activity] = values;
      }
    });

    const dataToSave = {
      pole: formData.pole,
      mois: formData.mois,
      structures: Object.fromEntries(
        Object.entries(formData.structures).filter(([_, value]) => value)
      ),
      activities: savedActivities
    };

    console.log('ConstructionTimesheet saving data:', dataToSave);
    if (onSave) {
      onSave(dataToSave);
    }
  };

  const totalStructures = Object.values(formData.structures)
    .reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

  const totalNT = activities.reduce((acc, activity) => {
    [1, 2, 3, 4, 5].forEach(col => {
      const key = `${activity}_${col}`;
      acc += parseFloat(formData.activities[key] || 0);
    });
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white shadow-lg">
        <div className="border-b-2 border-blue-600 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg">
                cosider
              </div>
              <span className="text-sm text-gray-600">Construction</span>
            </div>
            <div className="flex space-x-8">
              <div className="flex items-center space-x-2">
                <label className="font-semibold">POLE:</label>
                <input 
                  type="text"
                  value={formData.pole}
                  readOnly
                  className="border-b border-gray-400 px-2 py-1 bg-gray-100 outline-none"
                  placeholder="..................."
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-semibold">MOIS:</label>
                <input 
                  type="text"
                  value={formData.mois}
                  onChange={(e) => handleHeaderChange('mois', e.target.value)}
                  className="border-b border-gray-400 px-2 py-1 focus:outline-none focus:border-blue-500"
                  placeholder="................"
                />
              </div>
              <div className="text-sm font-semibold">
                Doc. 03
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 text-center">
          <h1 className="text-2xl font-bold tracking-wider">
            VENTILATIONS DES HEURES TRAVAILLEES
          </h1>
        </div>

        <div className="flex">
          <div className="w-1/3 border-r-2 border-blue-600">
            <div className="bg-gray-100 border-b border-gray-300 p-3">
              <div className="flex">
                <div className="w-3/4 text-center font-bold">STRUCTURES</div>
                <div className="w-1/4 text-center font-bold border-l border-gray-300">HEURES</div>
              </div>
            </div>
            
            {structures.map((structure, index) => (
              <div key={index} className="flex border-b border-gray-200 hover:bg-gray-50">
                <div className="w-3/4 p-3 text-sm font-medium border-r border-gray-200">
                  {structure}
                </div>
                <div className="w-1/4 p-2">
                  <input
                    type="number"
                    value={formData.structures[structure] || ''}
                    className="w-full text-center text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleInputChange('structures', structure, e.target.value)}
                  />
                </div>
              </div>
            ))}
            
            <div className="flex border-b-2 border-gray-400 bg-gray-100">
              <div className="w-3/4 p-3 text-sm font-bold border-r border-gray-300">
                TOTAL STRUCTURES
              </div>
              <div className="w-1/4 p-2">
                <input
                  type="number"
                  value={totalStructures || ''}
                  className="w-full text-center text-sm font-bold border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </div>
            </div>

            <div className="flex bg-gray-200">
              <div className="w-3/4 p-3 text-sm font-bold border-r border-gray-400">
                TOTAL POLE
              </div>
              <div className="w-1/4 p-2">
                <input
                  type="number"
                  value={(totalStructures + totalNT) || ''}
                  className="w-full text-center text-sm font-bold border-2 border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="w-2/3">
            <div className="bg-gray-100 border-b border-gray-300 p-3">
              <div className="flex">
                <div className="w-2/5 text-center font-bold">ACTIVITES</div>
                <div className="w-3/5 flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex-1 text-center font-bold border-l border-gray-300 text-xs">
                      NT:.........
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {activities.map((activity, index) => (
              <div key={index} className="flex border-b border-gray-200 hover:bg-gray-50">
                <div className="w-2/5 p-3 text-sm font-medium border-r border-gray-200">
                  {activity}
                </div>
                <div className="w-3/5 flex">
                  {[1, 2, 3, 4, 5].map(col => (
                    <div key={col} className="flex-1 p-2 border-l border-gray-200">
                      <input
                        type="number"
                        value={formData.activities[`${activity}_${col}`] || ''}
                        className="w-full text-center text-sm border border-gray-300 rounded px-1 py-1 focus:outline-none focus:border-blue-500"
                        onChange={(e) => handleInputChange('activities', `${activity}_${col}`, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex border-b-2 border-gray-400 bg-gray-100">
              <div className="w-2/5 p-3 text-sm font-bold border-r border-gray-300">
                TOTAL NT
              </div>
              <div className="w-3/5 flex">
                {[1, 2, 3, 4, 5].map(col => (
                  <div key={col} className="flex-1 p-2 border-l border-gray-300">
                    <input
                      type="number"
                      value={activities.reduce((sum, activity) => {
                        const value = parseFloat(formData.activities[`${activity}_${col}`] || 0);
                        return sum + value;
                      }, 0) || ''}
                      className="w-full text-center text-sm font-bold border border-gray-400 rounded px-1 py-1 focus:outline-none focus:border-blue-500"
                      readOnly
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 text-right">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Timesheet
          </button>
        </div>

        <div className="border-t-2 border-blue-600 p-2 bg-gray-100">
          <div className="text-right text-xs font-semibold text-gray-600">
            PRO-04-ENR-10
          </div>
        </div>
      </div>
    </div>
  );
});

export default ConstructionTimesheet;