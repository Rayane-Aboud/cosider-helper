import React from 'react'
import Dashboard from './views/Dashboard'
import ListeDesPoles from './views/ListeDesPoles'
import ListeDesDirecteurs from './views/ListeDesDirecteurs'
import ListeDesNT from './views/ListeDesNT'
import ListePolesRemplis from './views/ListePolesRemplis'
import ListePolesNonRemplis from './views/ListePolesNonRemplis'
import Settings from './views/Settings'

function MainContent({ 
  activeView, 
  setActiveView, 
  poles, 
  directors, 
  nts, 
  onAddPole, 
  onAddDirector, 
  onAddNT,
  onSavePassword,
  onDeletePole 
}) {
  const renderContent = () => {
    switch(activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            poles={poles} 
            setActiveView={setActiveView} 
          />
        )
      case 'poles':
        return (
          <ListeDesPoles 
            poles={poles} 
            directors={directors} 
            onAddPole={onAddPole} 
          />
        )
      case 'directors':
        return (
          <ListeDesDirecteurs 
            directors={directors} 
            poles={poles} 
            onAddDirector={onAddDirector} 
          />
        )
      case 'nt':
        return (
          <ListeDesNT 
            nts={nts} 
            poles={poles} 
            onAddNT={onAddNT} 
          />
        )
      case 'polesRemplis':
        return (
          <ListePolesRemplis 
            poles={poles} 
            directors={directors} 
          />
        )
      case 'polesNonRemplis':
        return (
          <ListePolesNonRemplis 
            poles={poles} 
            directors={directors} 
          />
        )
      case 'settings':
        return (
          <Settings 
            poles={poles} 
            onSavePassword={onSavePassword} 
            onAddPole={onAddPole} 
            onDeletePole={onDeletePole} 
          />
        )
      default:
        return <Dashboard poles={poles} setActiveView={setActiveView} />
    }
  }

  return (
    <main className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="bg-white rounded-lg shadow p-6">
        {renderContent()}
      </div>
    </main>
  )
}

export default MainContent