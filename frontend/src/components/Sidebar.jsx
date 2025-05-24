"use client"

function Sidebar({ activeView, setActiveView, isVisible, onLogout }) {
  return (
    <div className={`sidebar ${isVisible ? "show" : ""}`}>
      <div className="pt-4 pb-2 px-3">
        <h5 className="text-white">Navigation</h5>
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            className={`nav-link ${activeView === "dashboard" ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setActiveView("dashboard")
            }}
          >
            <span className="nav-icon">📊</span>
            Tableau de bord
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${activeView.includes("pole") ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setActiveView("poles")
            }}
          >
            <span className="nav-icon">📁</span>
            Liste des pôles
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${activeView === "directors" ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setActiveView("directors")
            }}
          >
            <span className="nav-icon">👤</span>
            Liste des directeurs
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${activeView === "nt" ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setActiveView("nt")
            }}
          >
            <span className="nav-icon">📄</span>
            Liste des NT
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${activeView === "settings" ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setActiveView("settings")
            }}
          >
            <span className="nav-icon">⚙️</span>
            Paramètres
          </a>
        </li>

        <li className="nav-item mt-3">
          <a
            className="nav-link"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onLogout()
            }}
          >
            <span className="nav-icon">🚪</span>
            Déconnexion
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar