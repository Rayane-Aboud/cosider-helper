import React, { useState } from 'react';

export default function FlashMensuel() {
  const [formData, setFormData] = useState({
    intitule: '',
    pole: '',
    nt: '',
    mois: '',
    observations: '',
    responsable: '',
    date: '',
    visa: '',
    travauxDivers: ''
  });

  const [activities, setActivities] = useState({
    terrassementsGeneraux: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    terrassementsParticuliers: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    beton: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    coffrage: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    ferraillage: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    maconnerie: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    endrobesNoirs: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    charpenteMetallique: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    forage: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' }
  });

  const [equipments, setEquipments] = useState({
    chauffageClimatisation: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    traitementsFacades: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    revetements: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    plomberieSanitaire: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    electricite: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    etancheite: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    peinture: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    travauxBois: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' },
    ferronnerieMenuiserie: { quantite: '', valeurKDA: '', quantiteSupp: '', valeurSupp: '', valPreste: '', valKDA: '' }
  });

  const handleInputChange = (section, field, subfield, value) => {
    if (section === 'form') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'activities') {
      setActivities(prev => ({
        ...prev,
        [field]: { ...prev[field], [subfield]: value }
      }));
    } else if (section === 'equipments') {
      setEquipments(prev => ({
        ...prev,
        [field]: { ...prev[field], [subfield]: value }
      }));
    }
  };

  const ActivityRow = ({ label, unit, field, data, section }) => (
    <tr className="border-b border-gray-300">
      <td className="border-r border-gray-300 px-2 py-1 font-medium text-sm bg-gray-50">{label}</td>
      <td className="border-r border-gray-300 px-1 py-1 text-xs text-center w-8">{unit}</td>
      <td className="border-r border-gray-300 px-1 py-1 w-16">
        <input 
          type="text" 
          className="w-full text-xs border-none bg-transparent text-center focus:ring-1 focus:ring-blue-300"
          value={data.quantite}
          onChange={(e) => handleInputChange(section, field, 'quantite', e.target.value)}
        />
      </td>
      <td className="border-r border-gray-300 px-1 py-1 w-20">
        <input 
          type="text" 
          className="w-full text-xs border-none bg-transparent text-center focus:ring-1 focus:ring-blue-300"
          value={data.valeurKDA}
          onChange={(e) => handleInputChange(section, field, 'valeurKDA', e.target.value)}
        />
      </td>
      <td className="border-r border-gray-300 px-1 py-1 w-16">
        <input 
          type="text" 
          className="w-full text-xs border-none bg-transparent text-center focus:ring-1 focus:ring-blue-300"
          value={data.quantiteSupp}
          onChange={(e) => handleInputChange(section, field, 'quantiteSupp', e.target.value)}
        />
      </td>
      <td className="border-r border-gray-300 px-1 py-1 w-20">
        <input 
          type="text" 
          className="w-full text-xs border-none bg-transparent text-center focus:ring-1 focus:ring-blue-300"
          value={data.valeurSupp}
          onChange={(e) => handleInputChange(section, field, 'valeurSupp', e.target.value)}
        />
      </td>
      <td className="border-r border-gray-300 px-1 py-1 w-16">
        <input 
          type="text" 
          className="w-full text-xs border-none bg-transparent text-center focus:ring-1 focus:ring-blue-300"
          value={data.valPreste}
          onChange={(e) => handleInputChange(section, field, 'valPreste', e.target.value)}
        />
      </td>
      <td className="px-1 py-1 w-20">
        <input 
          type="text" 
          className="w-full text-xs border-none bg-transparent text-center focus:ring-1 focus:ring-blue-300"
          value={data.valKDA}
          onChange={(e) => handleInputChange(section, field, 'valKDA', e.target.value)}
        />
      </td>
    </tr>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      {/* Header */}
      <div className="border-2 border-black mb-4">
        <div className="bg-red-600 text-white px-3 py-1 text-sm font-bold flex justify-between items-center">
          <span>cosidor</span>
          <span className="text-xs">Doc. 03</span>
        </div>
        
        <div className="text-center py-3">
          <h1 className="text-2xl font-bold tracking-wider">FLASH MENSUEL</h1>
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-4 border-t border-black text-sm">
          <div className="border-r border-black px-2 py-2">
            <label className="font-medium">INTITULE:</label>
            <input 
              type="text" 
              className="ml-2 border-b border-dotted border-black bg-transparent focus:outline-none focus:border-blue-500"
              value={formData.intitule}
              onChange={(e) => handleInputChange('form', 'intitule', '', e.target.value)}
            />
          </div>
          <div className="border-r border-black px-2 py-2">
            <label className="font-medium">POLE:</label>
            <input 
              type="text" 
              className="ml-2 border-b border-dotted border-black bg-transparent focus:outline-none focus:border-blue-500"
              value={formData.pole}
              onChange={(e) => handleInputChange('form', 'pole', '', e.target.value)}
            />
          </div>
          <div className="border-r border-black px-2 py-2">
            <label className="font-medium">N°:</label>
            <input 
              type="text" 
              className="ml-2 border-b border-dotted border-black bg-transparent focus:outline-none focus:border-blue-500"
              value={formData.nt}
              onChange={(e) => handleInputChange('form', 'nt', '', e.target.value)}
            />
          </div>
          <div className="px-2 py-2">
            <label className="font-medium">Mois:</label>
            <input 
              type="text" 
              className="ml-2 border-b border-dotted border-black bg-transparent focus:outline-none focus:border-blue-500"
              value={formData.mois}
              onChange={(e) => handleInputChange('form', 'mois', '', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-black overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th rowSpan="2" className="border-r border-black px-2 py-2 text-sm font-bold w-48">ACTIVITES</th>
              <th rowSpan="2" className="border-r border-black px-1 py-2 text-xs w-8">U</th>
              <th colSpan="2" className="border-r border-black px-2 py-1 text-xs font-bold">TRAVAUX CONTRACTUELS</th>
              <th colSpan="2" className="border-r border-black px-2 py-1 text-xs font-bold">TRAVAUX SUPPLEMENTAIRES</th>
              <th className="border-r border-black px-1 py-1 text-xs font-bold w-16">DONT S/T</th>
              <th className="px-1 py-1 text-xs font-bold w-20">DONT PRESTE</th>
            </tr>
            <tr className="bg-gray-100 border-b border-black">
              <th className="border-r border-black px-1 py-1 text-xs w-16">QUANTITE</th>
              <th className="border-r border-black px-1 py-1 text-xs w-20">VALEUR KDA</th>
              <th className="border-r border-black px-1 py-1 text-xs w-16">QUANTITE</th>
              <th className="border-r border-black px-1 py-1 text-xs w-20">VALEUR KDA</th>
              <th className="border-r border-black px-1 py-1 text-xs w-16">VAL. KDA</th>
              <th className="px-1 py-1 text-xs w-20">VAL. KDA</th>
            </tr>
          </thead>
          <tbody>
            <ActivityRow label="TERRASSEMENTS GENERAUX" unit="M³" field="terrassementsGeneraux" data={activities.terrassementsGeneraux} section="activities" />
            <ActivityRow label="TERRASSEMENTS PARTICULIERS" unit="M³" field="terrassementsParticuliers" data={activities.terrassementsParticuliers} section="activities" />
            <ActivityRow label="BETON" unit="M³" field="beton" data={activities.beton} section="activities" />
            <ActivityRow label="COFFRAGE" unit="M²" field="coffrage" data={activities.coffrage} section="activities" />
            <ActivityRow label="FERRAILLAGE" unit="KG" field="ferraillage" data={activities.ferraillage} section="activities" />
            <ActivityRow label="MACONNERIE" unit="M²" field="maconnerie" data={activities.maconnerie} section="activities" />
            <ActivityRow label="ENDROBES NOIRS" unit="T" field="endrobesNoirs" data={activities.endrobesNoirs} section="activities" />
            <ActivityRow label="CHARPENTE METALLIQUE" unit="KG" field="charpenteMetallique" data={activities.charpenteMetallique} section="activities" />
            <ActivityRow label="FORAGE" unit="ML" field="forage" data={activities.forage} section="activities" />
            
            {/* Empty rows for additional entries */}
            <tr className="border-b border-gray-300">
              <td className="border-r border-gray-300 px-2 py-1 font-medium text-sm bg-gray-50">Etudes</td>
              <td className="border-r border-gray-300 px-1 py-1 text-xs text-center"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="px-1 py-1"></td>
            </tr>
            
            <tr className="border-b border-gray-300">
              <td className="border-r border-gray-300 px-2 py-1 font-medium text-sm bg-gray-50">V.R.D</td>
              <td className="border-r border-gray-300 px-1 py-1 text-xs text-center"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="px-1 py-1"></td>
            </tr>
            
            <tr className="border-b border-gray-300">
              <td className="border-r border-gray-300 px-2 py-1 font-medium text-sm bg-gray-50">TRAVAUX DIVERS</td>
              <td className="border-r border-gray-300 px-1 py-1 text-xs text-center"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="px-1 py-1"></td>
            </tr>
            
            <tr className="border-b border-gray-300">
              <td className="border-r border-gray-300 px-2 py-1 font-medium text-sm bg-gray-50">INSTALLATION ET REPLI</td>
              <td className="border-r border-gray-300 px-1 py-1 text-xs text-center"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="border-r border-gray-300 px-1 py-1"></td>
              <td className="px-1 py-1"></td>
            </tr>
          </tbody>
        </table>

        {/* Equipment Section */}
        <table className="w-full text-xs border-t border-black">
          <tbody>
            <tr className="bg-gray-200">
              <td rowSpan="9" className="border-r border-black px-2 py-4 text-sm font-bold text-center w-20 align-middle">
                <div className="transform -rotate-90 whitespace-nowrap">SECOND ŒUVRE</div>
              </td>
              <td className="border-r border-gray-300 px-2 py-1 font-medium text-sm bg-gray-50 w-44">EQUIPEMENTS</td>
              <td className="border-r border-gray-300 px-1 py-1 text-xs text-center w-8"></td>
              <td className="border-r border-gray-300 px-1 py-1 w-16"></td>
              <td className="border-r border-gray-300 px-1 py-1 w-20"></td>
              <td className="border-r border-gray-300 px-1 py-1 w-16"></td>
              <td className="border-r border-gray-300 px-1 py-1 w-20"></td>
              <td className="border-r border-gray-300 px-1 py-1 w-16"></td>
              <td className="px-1 py-1 w-20"></td>
            </tr>
            <ActivityRow label="CHAUFFAGE CLIMATISATION" unit="" field="chauffageClimatisation" data={equipments.chauffageClimatisation} section="equipments" />
            <ActivityRow label="TRAITEMENTS DE FACADES" unit="" field="traitementsFacades" data={equipments.traitementsFacades} section="equipments" />
            <ActivityRow label="REVETEMENTS" unit="" field="revetements" data={equipments.revetements} section="equipments" />
            <ActivityRow label="PLOMBERIE - SANITAIRE" unit="" field="plomberieSanitaire" data={equipments.plomberieSanitaire} section="equipments" />
            <ActivityRow label="ELECTRICITE" unit="" field="electricite" data={equipments.electricite} section="equipments" />
            <ActivityRow label="ETANCHEITE" unit="" field="etancheite" data={equipments.etancheite} section="equipments" />
            <ActivityRow label="PEINTURE" unit="" field="peinture" data={equipments.peinture} section="equipments" />
            <ActivityRow label="TRAVAUX BOIS" unit="" field="travauxBois" data={equipments.travauxBois} section="equipments" />
            <ActivityRow label="FERRONNERIE & MENUISERIE ALU" unit="" field="ferronnerieMenuiserie" data={equipments.ferronnerieMenuiserie} section="equipments" />
          </tbody>
        </table>

        {/* Totals */}
        <table className="w-full text-xs border-t border-black">
          <tbody>
            <tr className="bg-gray-100 border-b border-black">
              <td className="border-r border-gray-300 px-2 py-2 font-bold text-sm w-52">VALEURS TOTALES</td>
              <td className="border-r border-gray-300 px-1 py-2 w-8"></td>
              <td className="border-r border-gray-300 px-1 py-2 w-16 bg-yellow-100"></td>
              <td className="border-r border-gray-300 px-1 py-2 w-20 bg-yellow-100"></td>
              <td className="border-r border-gray-300 px-1 py-2 w-16 bg-yellow-100"></td>
              <td className="border-r border-gray-300 px-1 py-2 w-20 bg-yellow-100"></td>
              <td className="border-r border-gray-300 px-1 py-2 w-16 bg-yellow-100"></td>
              <td className="px-1 py-2 w-20 bg-yellow-100"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Observations */}
        <div className="border border-black">
          <div className="bg-gray-100 px-2 py-1 border-b border-black">
            <span className="font-bold text-sm">OBSERVATIONS</span>
          </div>
          <div className="p-2 h-32">
            <textarea 
              className="w-full h-full resize-none border-none focus:outline-none text-xs"
              value={formData.observations}
              onChange={(e) => handleInputChange('form', 'observations', '', e.target.value)}
            />
          </div>
        </div>

        {/* Responsable */}
        <div className="border border-black">
          <div className="bg-gray-100 px-2 py-1 border-b border-black text-center">
            <span className="font-bold text-sm">RESPONSABLE DU CHANTIER</span>
          </div>
          <div className="grid grid-cols-3 h-32">
            <div className="border-r border-gray-300 p-2">
              <div className="text-xs font-medium mb-1">NOM</div>
              <input 
                type="text" 
                className="w-full text-xs border-none bg-transparent focus:outline-none"
                value={formData.responsable}
                onChange={(e) => handleInputChange('form', 'responsable', '', e.target.value)}
              />
            </div>
            <div className="border-r border-gray-300 p-2">
              <div className="text-xs font-medium mb-1">DATE</div>
              <input 
                type="text" 
                className="w-full text-xs border-none bg-transparent focus:outline-none"
                value={formData.date}
                onChange={(e) => handleInputChange('form', 'date', '', e.target.value)}
              />
            </div>
            <div className="p-2">
              <div className="text-xs font-medium mb-1">VISA</div>
              <input 
                type="text" 
                className="w-full text-xs border-none bg-transparent focus:outline-none"
                value={formData.visa}
                onChange={(e) => handleInputChange('form', 'visa', '', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-4 text-xs">
        <p className="text-red-600 font-medium">
          <strong>NB :</strong> Il est demandé de définir les travaux divers.
        </p>
        <p className="mt-1">
          Les Travaux divers déclarés sont : 
          <input 
            type="text" 
            className="ml-2 border-b border-dotted border-black bg-transparent focus:outline-none focus:border-blue-500"
            value={formData.travauxDivers}
            onChange={(e) => handleInputChange('form', 'travauxDivers', '', e.target.value)}
          />
        </p>
        <p className="text-right mt-4 text-xs">PRO-04-ENR-10</p>
      </div>
    </div>
  );
}