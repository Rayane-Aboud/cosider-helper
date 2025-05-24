import React, { useState } from 'react';

export default function RecapSortieAtelier() {
  const [formData, setFormData] = useState({
    mois: '',
    pole: '',
    atelierPrefa: '',
    installations: '',
    codesNT: '',
    clientExterne: '',
    total: 0
  });

  const [rows, setRows] = useState(Array(12).fill().map(() => ({ destination: '', armatures: '' })));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
    
    // Calculate total
    const total = newRows.reduce((sum, row) => {
      const armatureValue = parseFloat(row.armatures) || 0;
      return sum + armatureValue;
    }, 0);
    
    setFormData(prev => ({ ...prev, total }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="border-2 border-black">
        {/* Top section with logo and month */}
        <div className="flex border-b-2 border-black">
          <div className="w-1/2 p-2 border-r-2 border-black">
            <div className="text-red-600 font-bold text-lg">cosider</div>
          </div>
          <div className="w-1/2 p-2 flex justify-between items-center">
            <span className="text-sm">Dec. 04</span>
            <div className="flex items-center">
              <span className="font-bold mr-2">MOIS :</span>
              <input
                type="text"
                value={formData.mois}
                onChange={(e) => handleInputChange('mois', e.target.value)}
                className="border-b border-dotted border-black bg-transparent outline-none w-24"
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-8 border-b-2 border-black">
          <h1 className="text-2xl font-bold">Recap Sortie Atelier Armatures</h1>
        </div>

        {/* Pole section */}
        <div className="p-2 border-b-2 border-black">
          <div className="flex items-center">
            <span className="font-bold mr-2">POLE :</span>
            <input
              type="text"
              value={formData.pole}
              onChange={(e) => handleInputChange('pole', e.target.value)}
              className="border-b border-dotted border-black bg-transparent outline-none flex-1"
            />
          </div>
        </div>

        {/* Table header */}
        <div className="flex border-b-2 border-black bg-gray-100">
          <div className="w-1/2 p-3 border-r-2 border-black text-center font-bold">
            DESTINATION
          </div>
          <div className="w-1/2 p-3 text-center font-bold">
            ARMATURES (T)
          </div>
        </div>

        {/* Atelier Prefabrication row */}
        <div className="flex border-b border-black">
          <div className="w-1/2 p-2 border-r-2 border-black bg-gray-200 font-bold">
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

        {/* Installations row */}
        <div className="flex border-b border-black">
          <div className="w-1/2 p-2 border-r-2 border-black bg-gray-200 font-bold">
            INSTALLATIONS
          </div>
          <div className="w-1/2 p-2">
            <input
              type="number"
              step="0.01"
              value={formData.installations}
              onChange={(e) => handleInputChange('installations', e.target.value)}
              className="w-full bg-transparent outline-none text-center"
            />
          </div>
        </div>

        {/* Main data rows */}
        <div className="relative">
          {/* Page 1 watermark */}
          <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 text-6xl font-bold pointer-events-none">
            Page 1
          </div>
          {/* Page 2 watermark */}
          <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-gray-300 text-6xl font-bold pointer-events-none">
            Page 2
          </div>
          
          {rows.map((row, index) => (
            <div key={index} className="flex border-b border-black min-h-[40px]">
              <div className="w-1/2 p-2 border-r-2 border-black">
                <input
                  type="text"
                  value={row.destination}
                  onChange={(e) => handleRowChange(index, 'destination', e.target.value)}
                  className="w-full bg-transparent outline-none"
                  placeholder=""
                />
              </div>
              <div className="w-1/2 p-2">
                <input
                  type="number"
                  step="0.01"
                  value={row.armatures}
                  onChange={(e) => handleRowChange(index, 'armatures', e.target.value)}
                  className="w-full bg-transparent outline-none text-center"
                  placeholder=""
                />
              </div>
            </div>
          ))}
        </div>

        {/* Codes NT section */}
        <div className="border-t-2 border-black">
          <div className="flex">
            <div className="w-1/2 p-3 border-r-2 border-black bg-gray-200">
              <div className="font-bold mb-2">CODES NT</div>
              <textarea
                value={formData.codesNT}
                onChange={(e) => handleInputChange('codesNT', e.target.value)}
                className="w-full h-16 bg-transparent outline-none resize-none"
                placeholder=""
              />
            </div>
            <div className="w-1/2 p-3">
              {/* Empty space matching the original */}
            </div>
          </div>
        </div>

        {/* Client Externe row */}
        <div className="flex border-t border-black">
          <div className="w-1/2 p-2 border-r-2 border-black bg-gray-200 font-bold text-center">
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
        <div className="flex border-t-2 border-black">
          <div className="w-1/2 p-3 border-r-2 border-black bg-gray-200 font-bold text-center">
            TOTAL
          </div>
          <div className="w-1/2 p-3 text-center font-bold">
            {formData.total.toFixed(2)}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-green-100 p-2 text-right text-sm">
          PRO-04-ENR-10
        </div>
      </div>
    </div>
  );
}