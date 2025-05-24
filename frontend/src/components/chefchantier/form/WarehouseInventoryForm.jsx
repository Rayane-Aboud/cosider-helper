import React, { useState } from 'react';

const WarehouseInventoryForm = () => {
  const [formData, setFormData] = useState({
    pole: '',
    month: '',
    entries: {}
  });

  const inventoryData = [
    {
      category: 'GESTION',
      items: [
        { name: 'FOURNITURES DE BUREAU', unit: 'DA' },
        { name: 'MOBILIER', unit: 'DA' },
        { name: 'EQUIPEMENTS', unit: 'DA' },
        { name: 'FOURNITURE HYGIENE & SECURITE', unit: 'DA' },
        { name: 'FOURNITURE DIVERSES', unit: 'DA' }
      ]
    },
    {
      category: 'INSTALLATION',
      items: [
        { name: 'MOBILIER DE BUREAU / LOGEMENT', unit: 'DA' },
        { name: 'EQUIPEMENTS BUREAU / LOGEMENT', unit: 'DA' }
      ]
    },
    {
      category: 'CHANTIER CHAUDRONNERIE',
      items: [
        { name: 'MATERIAUX DE CONSTRUCTION', unit: 'DA' },
        { name: 'PROFILES & TOLES METAL', unit: 'T' },
        { name: 'OUTILLAGE', unit: 'DA' }
      ]
    },
    {
      category: 'ATELIER MECANIQUE',
      items: [
        { name: 'PIECES DE RECHANGE', unit: 'DA' },
        { name: 'PNEUMATIQUES', unit: 'DA' },
        { name: 'LUBRIFIANTS', unit: 'L' },
        { name: 'MATERIAUX DE MAINTENANCE DIVERS', unit: 'DA' },
        { name: 'OUTILLAGE', unit: 'DA' }
      ]
    },
    {
      category: 'PARC',
      items: [
        { name: 'CARBURANTS', unit: 'L' },
        { name: 'OUTILLAGE', unit: 'DA' }
      ]
    },
    {
      category: 'ATELIER DE COFFRAGE',
      items: [
        { name: 'MATERIAUX DE COFFRAGE', unit: 'DA' },
        { name: 'OUTILLAGE', unit: 'DA' }
      ]
    },
    {
      category: 'STATION DE CONCASSAGE',
      items: [
        { name: 'MATERIAUX DE CONSTRUCTION DIVERS', unit: 'DA' },
        { name: 'OUTILLAGE', unit: 'DA' }
      ]
    },
    {
      category: 'ATELIER ARMATURES',
      items: [
        { name: 'ARMATURES', unit: 'T' },
        { name: 'OUTILLAGE', unit: 'DA' },
        { name: 'CIMENTS', unit: 'T' }
      ]
    },
    {
      category: 'CENTRALE A BETON',
      items: [
        { name: 'SABLE', unit: 'M3' },
        { name: 'GRAVIERS', unit: 'M3' },
        { name: 'OUTILLAGE', unit: 'DA' }
      ]
    },
    {
      category: 'POSTE D\'ENROBAGE',
      items: [
        { name: 'SABLE', unit: 'M3' },
        { name: 'GRAVIERS', unit: 'M3' },
        { name: 'PRODUITS D\'ENROBAGE', unit: 'T' },
        { name: 'OUTILLAGE', unit: 'DA' }
      ]
    },
    {
      category: 'PREFABRICATION',
      items: [
        { name: 'OUTILLAGE', unit: 'DA' }
      ]
    }
  ];

  const handleInputChange = (category, item, field, value) => {
    const key = `${category}_${item}_${field}`;
    setFormData(prev => ({
      ...prev,
      entries: {
        ...prev.entries,
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

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      {/* Header */}
      <div className="border-2 border-black mb-4">
        <div className="bg-blue-100 p-2 text-center border-b border-black">
          <div className="flex justify-between items-center">
            <span className="font-bold text-red-600">cosider</span>
            <span className="text-sm">Doc. 04</span>
          </div>
        </div>
        
        <div className="text-center py-3 border-b border-black">
          <h1 className="font-bold text-lg">SORTIES DU MAGASIN</h1>
          <h2 className="font-bold text-lg">VERS LES STRUCTURES</h2>
        </div>
        
        <div className="flex border-b border-black">
          <div className="flex-1 p-2 border-r border-black">
            <label className="font-semibold">POLE: </label>
            <input 
              type="text" 
              value={formData.pole}
              onChange={(e) => handleHeaderChange('pole', e.target.value)}
              className="border-b border-dotted border-black bg-transparent outline-none ml-1"
              placeholder="............"
            />
          </div>
          <div className="flex-1 p-2">
            <label className="font-semibold">MOIS: </label>
            <input 
              type="text" 
              value={formData.month}
              onChange={(e) => handleHeaderChange('month', e.target.value)}
              className="border-b border-dotted border-black bg-transparent outline-none ml-1"
              placeholder="............"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border-2 border-black">
        {/* Table Header */}
        <div className="grid grid-cols-5 bg-gray-100 border-b border-black font-semibold">
          <div className="p-2 border-r border-black text-center">DESTINATION</div>
          <div className="p-2 border-r border-black text-center">DESIGNATION</div>
          <div className="p-2 border-r border-black text-center">U</div>
          <div className="p-2 border-r border-black text-center">QTE</div>
          <div className="p-2 text-center">VALEUR</div>
        </div>

        {/* Table Body */}
        {inventoryData.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.items.map((item, itemIndex) => (
              <div key={`${sectionIndex}-${itemIndex}`} className="grid grid-cols-5 border-b border-black">
                {/* Destination - only show category name on first item */}
                <div className="p-2 border-r border-black font-semibold text-center bg-gray-50">
                  {itemIndex === 0 ? section.category : ''}
                </div>
                
                {/* Designation */}
                <div className="p-2 border-r border-black text-sm">
                  {item.name}
                </div>
                
                {/* Unit */}
                <div className="p-2 border-r border-black text-center text-sm font-semibold">
                  {item.unit}
                </div>
                
                {/* Quantity */}
                <div className="p-2 border-r border-black">
                  <input 
                    type="number" 
                    className="w-full h-8 border border-gray-300 rounded px-2 text-center"
                    value={formData.entries[`${section.category}_${item.name}_qty`] || ''}
                    onChange={(e) => handleInputChange(section.category, item.name, 'qty', e.target.value)}
                  />
                </div>
                
                {/* Value */}
                <div className="p-2">
                  <input 
                    type="number" 
                    className="w-full h-8 border border-gray-300 rounded px-2 text-center"
                    value={formData.entries[`${section.category}_${item.name}_value`] || ''}
                    onChange={(e) => handleInputChange(section.category, item.name, 'value', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Total Row */}
        <div className="grid grid-cols-5 border-t-2 border-black bg-gray-100">
          <div className="p-2 border-r border-black"></div>
          <div className="p-2 border-r border-black"></div>
          <div className="p-2 border-r border-black"></div>
          <div className="p-2 border-r border-black font-bold text-center">TOTAL</div>
          <div className="p-2">
            <input 
              type="number" 
              className="w-full h-8 border border-gray-300 rounded px-2 text-center font-bold"
              readOnly
              value={
                Object.keys(formData.entries)
                  .filter(key => key.endsWith('_value'))
                  .reduce((sum, key) => sum + (parseFloat(formData.entries[key]) || 0), 0)
              }
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-right">
        <span className="text-sm font-mono bg-gray-100 px-2 py-1 border">PRO.04-ENR.10</span>
      </div>
    </div>
  );
};

export default WarehouseInventoryForm;