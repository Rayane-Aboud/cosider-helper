import React, { useState } from 'react';

export default function RecapSortieChaudronnerie() {
  const [formData, setFormData] = useState({
    mois: '',
    pole: '',
    atelierMecanique: '',
    atelierPrefa: '',
    clientExterne: ''
  });

  const [codesNTRows, setCodesNTRows] = useState(Array(8).fill().map(() => ({ code: '' })));
  const [travauxDiversRows, setTravauxDiversRows] = useState(Array(8).fill().map(() => ({ travaux: '' })));
  const [travauxMetalliquesRows, setTravauxMetalliquesRows] = useState(Array(8).fill().map(() => ({ travaux: '' })));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCodesNTChange = (index, value) => {
    const newRows = [...codesNTRows];
    newRows[index] = { code: value };
    setCodesNTRows(newRows);
  };

  const handleTravauxDiversChange = (index, value) => {
    const newRows = [...travauxDiversRows];
    newRows[index] = { travaux: value };
    setTravauxDiversRows(newRows);
  };

  const handleTravauxMetalliquesChange = (index, value) => {
    const newRows = [...travauxMetalliquesRows];
    newRows[index] = { travaux: value };
    setTravauxMetalliquesRows(newRows);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <div className="border-2 border-blue-600">
        {/* Header */}
        <div className="flex border-b-2 border-blue-600">
          <div className="w-1/3 p-2 border-r-2 border-blue-600">
            <div className="text-red-600 font-bold text-lg">cosider</div>
          </div>
          <div className="w-1/3 p-2 border-r-2 border-blue-600"></div>
          <div className="w-1/3 p-2 flex justify-between items-center">
            <span className="text-sm">Doc. 06</span>
            <div className="flex items-center">
              <span className="font-bold mr-2">MOIS :</span>
              <input
                type="text"
                value={formData.mois}
                onChange={(e) => handleInputChange('mois', e.target.value)}
                className="border-b border-black bg-transparent outline-none w-24"
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="p-6 border-b-2 border-blue-600">
          <h1 className="text-2xl font-bold">Recap Sortie Atelier de Chaudronnerie</h1>
        </div>

        {/* Pole section */}
        <div className="p-2 border-b-2 border-blue-600">
          <div className="flex items-center">
            <span className="font-bold mr-2">POLE :</span>
            <input
              type="text"
              value={formData.pole}
              onChange={(e) => handleInputChange('pole', e.target.value)}
              className="border-b border-black bg-transparent outline-none flex-1"
            />
          </div>
        </div>

        {/* Table header */}
        <div className="flex border-b-2 border-blue-600 bg-blue-100">
          <div className="w-1/2 p-3 border-r-2 border-blue-600 text-center font-bold">
            DESIGNATION
          </div>
          <div className="w-1/2 p-3 text-center font-bold">
            CHAUDRONNERIE (KG)
          </div>
        </div>

        {/* Atelier Mecanique row */}
        <div className="flex border-b border-blue-600">
          <div className="w-1/2 p-2 border-r-2 border-blue-600 bg-gray-100 font-bold">
            ATELIER MECANIQUE
          </div>
          <div className="w-1/2 p-2">
            <input
              type="number"
              step="0.01"
              value={formData.atelierMecanique}
              onChange={(e) => handleInputChange('atelierMecanique', e.target.value)}
              className="w-full bg-transparent outline-none text-center"
            />
          </div>
        </div>

        {/* Atelier Prefabrication row */}
        <div className="flex border-b border-blue-600">
          <div className="w-1/2 p-2 border-r-2 border-blue-600 bg-gray-100 font-bold">
            ATELIER PREFABRICATION
          </div>
          <div className="w-1/2 p-2">
            <input
              type="number"
              step="0.01"
              value={formData.atelierPrefa}
              onChange={(e) => handleInputChange('atelierPrefa', e.target.value)}
              className="w-full bg-transparent outline-none text-center"
            />
          </div>
        </div>

        {/* Three-column section */}
        <div className="relative">
          {/* Page watermark */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 text-6xl font-bold pointer-events-none z-10">
            Page
          </div>
          
          <div className="flex border-b border-blue-600">
            {/* Codes NT column */}
            <div className="w-1/6 border-r border-blue-600">
              <div className="p-2 bg-gray-100 font-bold text-center border-b border-blue-600">
                CODES NT
              </div>
              {codesNTRows.map((row, index) => (
                <div key={index} className="border-b border-blue-600 min-h-[35px]">
                  <input
                    type="text"
                    value={row.code}
                    onChange={(e) => handleCodesNTChange(index, e.target.value)}
                    className="w-full h-full p-1 bg-transparent outline-none text-center text-sm"
                  />
                </div>
              ))}
              <div className="p-2 bg-gray-100 font-bold text-center">
                NT
              </div>
            </div>

            {/* Travaux Divers column */}
            <div className="w-1/3 border-r border-blue-600">
              <div className="p-2 bg-gray-100 font-bold text-center border-b border-blue-600">
                TRAVAUX DIVERS
              </div>
              {travauxDiversRows.map((row, index) => (
                <div key={index} className="border-b border-blue-600 min-h-[35px]">
                  <input
                    type="text"
                    value={row.travaux}
                    onChange={(e) => handleTravauxDiversChange(index, e.target.value)}
                    className="w-full h-full p-1 bg-transparent outline-none text-sm"
                  />
                </div>
              ))}
              <div className="min-h-[35px]"></div>
            </div>

            {/* Travaux Metalliques column */}
            <div className="w-1/2">
              <div className="p-2 bg-gray-100 font-bold text-center border-b border-blue-600">
                TRAVAUX METALLIQUES
              </div>
              {travauxMetalliquesRows.map((row, index) => (
                <div key={index} className="border-b border-blue-600 min-h-[35px]">
                  <input
                    type="text"
                    value={row.travaux}
                    onChange={(e) => handleTravauxMetalliquesChange(index, e.target.value)}
                    className="w-full h-full p-1 bg-transparent outline-none text-sm"
                  />
                </div>
              ))}
              <div className="min-h-[35px]"></div>
            </div>
          </div>
        </div>

        {/* Client Externe row */}
        <div className="flex border-b border-blue-600">
          <div className="w-1/2 p-2 border-r-2 border-blue-600 bg-gray-100 font-bold">
            CLIENT EXTERNE
          </div>
          <div className="w-1/2 p-2">
            <input
              type="number"
              step="0.01"
              value={formData.clientExterne}
              onChange={(e) => handleInputChange('clientExterne', e.target.value)}
              className="w-full bg-transparent outline-none text-center"
            />
          </div>
        </div>

        {/* Total row */}
        <div className="flex border-b-2 border-blue-600">
          <div className="w-1/2 p-3 border-r-2 border-blue-600 bg-blue-100 font-bold text-center">
            TOTAL
          </div>
          <div className="w-1/2 p-3 text-center font-bold">
            {/* Auto-calculate total */}
            {(
              (parseFloat(formData.atelierMecanique) || 0) +
              (parseFloat(formData.atelierPrefa) || 0) +
              (parseFloat(formData.clientExterne) || 0)
            ).toFixed(2)}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-50 p-2 text-right text-sm">
          PRO-04-ENR-10
        </div>
      </div>
    </div>
  );
}
