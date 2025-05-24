import React, { useState } from 'react';
import { 
  Menu, 
  Settings, 
  LogOut,
  Search,
  Plus,
  FileText,
  ChevronDown,
  ChevronRight,
  File,
  Save
} from 'lucide-react';
import ConstructionTimesheet from './form/ConstructionTimesheet';
import FlashMensuel from './form/FlashMensuel';
import RecapSortieAtelier from './form/RecapSortieAtelier';
import RecapSortieChaudronnerie from './form/RecapSortieChaudronnerie';
import WarehouseInventoryForm from './form/WarehouseInventoryForm';

const ChefChantier = ({ userData, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({
    documents: true,
  });
  const [selectedComponent, setSelectedComponent] = useState(null);

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

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleSave = async (componentName) => {
    // Placeholder for save functionality
    try {
      // Example: Replace with actual form data collection from the component
      const formData = { component: componentName, data: {} }; // Adjust based on actual form data
      const response = await fetch(`/api/save-${componentName.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert(`${componentName} saved successfully!`);
      } else {
        alert(`Failed to save ${componentName}`);
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data');
    }
  };

  const MenuItem = ({ icon: Icon, label, isActive = false, hasSubmenu = false, isExpanded = false, onClick, children }) => (
    <div>
      <div 
        className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
        onClick={onClick}
        title={!isMenuOpen ? label : ''}
      >
        <Icon className="w-5 h-5 mr-3 text-gray-600 flex-shrink-0" />
        {isMenuOpen && (
          <>
            <span className="flex-1 text-gray-700">{label}</span>
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

  const renderMainContent = () => {
    switch (selectedComponent) {
      case 'ConstructionTimesheet':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => handleSave('ConstructionTimesheet')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
            <ConstructionTimesheet />
          </>
        );
      case 'FlashMensuel':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => handleSave('FlashMensuel')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
            <FlashMensuel />
          </>
        );
      case 'RecapSortieAtelier':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => handleSave('RecapSortieAtelier')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
            <RecapSortieAtelier />
          </>
        );
      case 'RecapSortieChaudronnerie':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => handleSave('RecapSortieChaudronnerie')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
            <RecapSortieChaudronnerie />
          </>
        );
      case 'WarehouseInventoryForm':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => handleSave('WarehouseInventoryForm')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
            <WarehouseInventoryForm />
          </>
        );
      default:
        return (
          <>
            {/* Notes Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Notes D'information</h2>
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-3 pr-10 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700 transition-colors">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="ml-2 px-3 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors text-sm">
                    Basculer vers dotNet
                  </button>
                </div>
                
                {/* New Note Button */}
                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Note
                </button>
              </div>
            </div>

            {/* Notes Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Référence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Objet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pièce jointe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supprimer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNotes.map((note, index) => (
                    <tr 
                      key={note.id}
                      className={`hover:bg-gray-50 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      onClick={() => setSelectedNote(note)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {note.reference}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {note.objet}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {note.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {note.pieceJointe && (
                          <FileText className="w-5 h-5 text-blue-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
                          Supprimé
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Results */}
            {filteredNotes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucune note trouvée pour "{searchTerm}"
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
        {/* Header */}
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
          {isMenuOpen && <div className="text-red-600 font-bold text-lg">cosidar كوسيدار</div>}
        </div>

        {/* Navigation Menu */}
        <nav className="py-4">
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
              onClick={() => setSelectedComponent('ConstructionTimesheet')}
            />
            <MenuItem 
              icon={FileText} 
              label="Flash Mensuel"
              onClick={() => setSelectedComponent('FlashMensuel')}
            />
            <MenuItem 
              icon={FileText} 
              label="Recap Sortie Atelier"
              onClick={() => setSelectedComponent('RecapSortieAtelier')}
            />
            <MenuItem 
              icon={FileText} 
              label="Recap Sortie Chaudronnerie"
              onClick={() => setSelectedComponent('RecapSortieChaudronnerie')}
            />
            <MenuItem 
              icon={FileText} 
              label="Warehouse Inventory"
              onClick={() => setSelectedComponent('WarehouseInventoryForm')}
            />
          </MenuItem>
          
          <MenuItem 
            icon={Settings} 
            label="Settings"
            hasSubmenu={true}
          />
          
          <MenuItem 
            icon={LogOut} 
            label="Déconnexion"
            onClick={onLogout}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              Application Suivi de la Médecine Au Travail
            </h1>
            <span className="text-sm text-gray-600">Direction générale</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {renderMainContent()}
        </div>
      </div>

      {/* Note Detail Modal */}
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
    </div>
  );
};

export default ChefChantier;