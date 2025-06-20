import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  LogOut,
  Search,
  Plus,
  FileText,
  ChevronDown,
  ChevronRight,
  File,
  Clock
} from 'lucide-react';
import ConstructionTimesheet from './form/ConstructionTimesheet';
import FlashMensuel from './form/FlashMensuel';
import RecapSortieAtelier from './form/RecapSortieAtelier';
import RecapSortieChaudronnerie from './form/RecapSortieChaudronnerie';
import WarehouseInventoryForm from './form/WarehouseInventoryForm';
import { addDocument, getDocumentsByPole, getPoleByCode } from '../../utils/data';
import dayjs from 'dayjs';

const ChefChantier = ({ userData, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({
    documents: true,
  });
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [activeView, setActiveView] = useState('notes');
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    console.log('ChefChantier userData:', userData);
    if (!userData?.poleData?.code) {
      console.error('Missing poleData.code in userData');
      alert('Erreur: Aucun code de pôle disponible. Veuillez vérifier votre connexion.');
    }
  }, [userData]);

  const notes = [
    {
      id: 542234,
      reference: '542234',
      objet: 'Mise à jour Actes convention YAKER',
      date: 'May 4, 2024',
      pieceJointe: true,
      status: 'Supprimé'
    },
    {
      id: 778443,
      reference: '778443',
      objet: 'Lancement campagne médecine de travail',
      date: 'May 3, 2024',
      pieceJointe: true,
      status: 'Supprimé'
    },
    {
      id: 876678,
      reference: '876678',
      objet: 'Ajout Nouvelle spécialité MUTRACO',
      date: 'May 10, 2024',
      pieceJointe: true,
      status: 'Supprimé'
    },
    {
      id: 978654,
      reference: '978654',
      objet: 'Établissement nouvelle convention Clinique Smilmana',
      date: 'May 9, 2024',
      pieceJointe: true,
      status: 'Supprimé'
    }
  ];

  const filteredNotes = notes.filter(note =>
    note.objet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.reference.includes(searchTerm)
  );

  const getDocuments = () => {
    const poleCode = userData?.poleData?.code;
    if (!poleCode) {
      console.error('getDocuments: No poleCode available');
      return [];
    }
    console.log(`Fetching documents for pole: ${poleCode}`);
    const docs = getDocumentsByPole(poleCode);
    console.log(`Documents retrieved:`, docs);
    return docs.filter(doc =>
      (documentTypeNames[doc.type] || doc.type).toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.includes(searchTerm)
    );
  };

  const formatDate = (mois, month) => {
    const dateStr = mois || month || 'January 1970';
    return dayjs(dateStr).format('DD/MM/YYYY');
  };

  const documentTypeNames = {
    construction_timesheet: 'Construction Timesheet',
    flash_mensuel: 'Flash Mensuel',
    recap_sortie_atelier: 'Récap Sortie Atelier',
    recap_sortie_chaudronnerie: 'Récap Sortie Chaudronnerie',
    warehouse_inventory: 'Warehouse Inventory'
  };

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const loadFormData = (formType) => {
    const poleCode = userData?.poleData?.code;
    if (!poleCode) {
      console.error('No poleCode available for loading form data');
      return;
    }
    console.log(`loadFormData ${formType}: poleCode=`, poleCode);
    const poleDocs = getDocumentsByPole(poleCode);
    console.log(`loadFormData ${formType}: poleDocs=`, poleDocs);
    const formDocs = poleDocs.filter((doc) => doc.type === formType);
    if (formDocs.length > 0) {
      const latestDoc = formDocs.reduce((latest, doc) => {
        const latestMois = latest.data.mois || latest.data.month || 'January 1970';
        const currentMois = doc.data.mois || doc.data.month || 'January 1970';
        return new Date(currentMois) > new Date(latestMois) ? doc : latest;
      });
      console.log(`Latest ${formType} doc:`, latestDoc);
      setFormData(latestDoc.data);
    } else {
      console.log(`No ${formType} documents found for pole ${poleCode}`);
      setFormData({ pole: poleCode, mois: '', month: '' });
    }
  };

  const handleSave = (updatedData) => {
    const poleCode = userData?.poleData?.code;
    console.log('handleSave: poleCode=', poleCode, 'selectedForm=', selectedForm, 'updatedData=', updatedData);
    if (!poleCode) {
      console.error('No poleCode available for saving');
      alert('Erreur: Aucun code de pôle disponible.');
      return;
    }
    if (!selectedForm) {
      console.error('No selectedForm set');
      alert('Erreur: Aucun formulaire sélectionné.');
      return;
    }
    if (!updatedData || Object.keys(updatedData).length === 0) {
      console.error('No updatedData provided or empty:', updatedData);
      alert('Erreur: Données invalides.');
      return;
    }
    const pole = getPoleByCode(poleCode);
    if (!pole) {
      console.error(`No pole found for poleCode: ${poleCode}`);
      alert('Erreur: Pôle non trouvé.');
      return;
    }
    const formattedData = {
      ...updatedData,
      mois: updatedData.mois ? new Date(updatedData.mois).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : updatedData.mois,
      month: updatedData.month ? new Date(updatedData.month).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : updatedData.month
    };
    const docId = `doc_${Date.now()}`;
    const newDoc = {
      id: docId,
      type: selectedForm,
      pole: poleCode,
      data: formattedData
    };
    try {
      console.log('Calling addDocument with:', newDoc);
      addDocument(newDoc);
      console.log('Document saved:', newDoc);
      console.log('Updated pole.documents:', pole.documents);
      setFormData(formattedData);
      alert('Nouveau document ajouté avec succès !');
    } catch (error) {
      console.error('Failed to save document:', error);
      alert('Erreur lors de l\'enregistrement du document.');
    }
  };

  const MenuItem = ({ icon: Icon, label, isActive = false, hasSubmenu = false, isExpanded = false, onClick, children }) => {
    console.log(`Rendering MenuItem: ${label}, isActive=${isActive}, hasSubmenu=${hasSubmenu}, isExpanded=${isExpanded}`);
    return (
      <div>
        <div 
          className={`flex items-center px-4 py-3 cursor-pointer hover:bg-red-600 hover:text-white ${isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
          onClick={onClick}
          title={!isMenuOpen ? label : ''}
        >
          <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-600'} flex-shrink-0`} />
          {isMenuOpen && (
            <>
              <span className={`flex-1 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>{label}</span>
              {hasSubmenu && (
                isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
              )}
            </>
          )}
        </div>
        {hasSubmenu && isExpanded && children && isMenuOpen && (
          <div className="ml-8">
            {children}
          </div>
        )}
      </div>
    );
  };

  const renderMainContent = () => {
    if (!userData?.poleData?.code) {
      console.error('renderMainContent: No poleCode available');
      return <div>Erreur: Aucun code de pôle disponible.</div>;
    }

    if (activeView === 'historique') {
      const documents = getDocuments();
      console.log('Rendering historique view, documents:', documents);
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Historique des Documents</h2>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-600 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Référence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de Soumission
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.length > 0 ? (
                  documents.map((doc, index) => (
                    <tr 
                      key={doc.id}
                      className={`hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {documentTypeNames[doc.type] || doc.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doc.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(doc.data.mois, doc.data.month)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                      Aucun document trouvé{searchTerm ? ` pour "${searchTerm}"` : ''}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    const componentMap = {
      construction_timesheet: ConstructionTimesheet,
      flash_mensuel: FlashMensuel,
      recap_sortie_atelier: RecapSortieAtelier,
      recap_sortie_chaudronnerie: RecapSortieChaudronnerie,
      warehouse_inventory: WarehouseInventoryForm,
    };

    const FormComponent = componentMap[selectedForm];
    if (FormComponent) {
      console.log(`Rendering form: ${selectedForm}, poleCode: ${userData.poleData.code}, formData:`, formData);
      return (
        <FormComponent
          poleCode={userData.poleData.code}
          formData={formData}
          onSave={handleSave}
        />
      );
    }

    const documents = getDocuments();
      console.log('Rendering historique view, documents:', documents);
      return (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Historique des Documents</h2>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-600 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Référence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de Soumission
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.length > 0 ? (
                  documents.map((doc, index) => (
                    <tr 
                      key={doc.id}
                      className={`hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {documentTypeNames[doc.type] || doc.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doc.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(doc.data.mois, doc.data.month)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                      Aucun document trouvé{searchTerm ? ` pour "${searchTerm}"` : ''}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`bg-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded hover:bg-gray-100 mr-3"
            >
              <Menu className="w-5 h-5" />
            </button>
            {isMenuOpen && <span className="font-semibold text-gray-800">Menu</span>}
          </div>
        
        </div>

        <nav className="py-4 flex flex-col h-[calc(100%-4rem)]">
          <div className="flex-1">
          <MenuItem 
                icon={Clock} 
                label="Historique"
                onClick={() => {
                  console.log('Clicked Historique');
                  setSelectedForm(null);
                  setActiveView('historique');
                  setSearchTerm('');
                }}
              />
            <MenuItem 
              icon={File} 
              label="Documents"
              hasSubmenu={true}
              isExpanded={expandedMenus.documents}
              onClick={() => toggleMenu('documents')}
            >
              <MenuItem 
                icon={FileText} 
                label="Construction Timesheet"
                onClick={() => {
                  console.log('Clicked Construction Timesheet');
                  setSelectedForm('construction_timesheet');
                  setActiveView('form');
                  loadFormData('construction_timesheet');
                }}
              />
              <MenuItem 
                icon={FileText} 
                label="Flash Mensuel"
                onClick={() => {
                  console.log('Clicked Flash Mensuel');
                  setSelectedForm('flash_mensuel');
                  setActiveView('form');
                  loadFormData('flash_mensuel');
                }}
              />
              <MenuItem 
                icon={FileText} 
                label="Recap Sortie Atelier"
                onClick={() => {
                  console.log('Clicked Recap Sortie Atelier');
                  setSelectedForm('recap_sortie_atelier');
                  setActiveView('form');
                  loadFormData('recap_sortie_atelier');
                }}
              />
              <MenuItem 
                icon={FileText} 
                label="Recap Sortie Chaudronnerie"
                onClick={() => {
                  console.log('Clicked Recap Sortie Chaudronnerie');
                  setSelectedForm('recap_sortie_chaudronnerie');
                  setActiveView('form');
                  loadFormData('recap_sortie_chaudronnerie');
                }}
              />
              <MenuItem 
                icon={FileText} 
                label="Warehouse Inventory"
                onClick={() => {
                  console.log('Clicked Warehouse Inventory');
                  setSelectedForm('warehouse_inventory');
                  setActiveView('form');
                  loadFormData('warehouse_inventory');
                }}
              />
              
            </MenuItem>

          </div>
          <MenuItem 
            icon={LogOut} 
            label="Déconnexion"
            onClick={onLogout}
          />
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/Logo_Cosider.png" 
                alt="Cosider Logo" 
                className="logo"
                style={{ width: '100px', height: '40px', objectFit: 'contain' }}
              />
        
             
            </div>
            <span className="text-sm text-gray-600">Chantier</span>
          </div>
          <h3><b>Application Suivi des données de Contrôle de gestion</b></h3>
        </div>

        <div className="flex-1 p-6">
          {renderMainContent()}
        </div>
      </div>

      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <h3 className="text-lg font-semibold mb-4">Détails de la Note</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Référence:</span> {selectedNote.reference}
              </div>
              <div>
                <span className="font-medium">Objet:</span> {selectedNote.objet}
              </div>
              <div>
                <span className="font-medium">Date:</span> {selectedNote.date}
              </div>
              <div>
                <span className="font-medium">Status:</span> {selectedNote.status}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setSelectedNote(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <h3 className="text-lg font-semibold mb-4">Détails du Document</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Type:</span> {documentTypeNames[selectedDocument.type] || selectedDocument.type}
              </div>
              <div>
                <span className="font-medium">Référence:</span> {selectedDocument.id}
              </div>
              <div>
                <span className="font-medium">Pôle:</span> {selectedDocument.pole}
              </div>
              <div>
                <span className="font-medium">Date:</span> {formatDate(selectedDocument.data.mois, selectedDocument.data.month)}
              </div>
              <div>
                <span className="font-medium">Données:</span>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(selectedDocument.data, null, 2)}
                </pre>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setSelectedDocument(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefChantier;