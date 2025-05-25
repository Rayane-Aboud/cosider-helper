"use client"

import {
  Menu,
  BarChart2,
  Folder,
  User,
  FileText,
  Settings,
  LogOut,
} from "lucide-react"

function Sidebar({ activeView, setActiveView, isVisible, onLogout }) {
  return (
    <div
      className={`sidebar ${isVisible ? "show" : ""} d-flex flex-column justify-between min-h-screen`}
    >
      <div>
        <div className="pt-4 pb-2 px-3">
          <Menu />
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
              <BarChart2 className="nav-icon me-2" size={18} />
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
              <Folder className="nav-icon me-2" size={18} />
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
              <User className="nav-icon me-2" size={18} />
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
              <FileText className="nav-icon me-2" size={18} />
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
              <Settings className="nav-icon me-2" size={18} />
              Paramètres
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-auto p-3">
        <a
          className="nav-link text-danger"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onLogout()
          }}
        >
          <LogOut className="nav-icon me-2" size={18} />
          Déconnexion
        </a>
      </div>
    </div>
  )
}

export default Sidebar
