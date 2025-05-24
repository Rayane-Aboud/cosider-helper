"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header.jsx"
import Sidebar from "./components/Sidebar.jsx"
import MainContent from "./components/MainContent.jsx"
import ChefChantier from "./components/chefchantier/ChefChantier.jsx" // Import your second component
import LoginPage from "./components/LoginPage.jsx"

const API_BASE_URL = "http://127.0.0.1:8000";

export const addPole = async (poleData, token) => {
  const response = await fetch(`${API_BASE_URL}/api/poles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(poleData)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add pole');
  }
  
  return await response.json();
};

function App() {
  const [activeView, setActiveView] = useState("dashboard")
  const [poles, setPoles] = useState([])
  const [directors, setDirectors] = useState([])
  const [nts, setNTs] = useState([])
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState(null) // Track user type
  const [userData, setUserData] = useState(null) // Store user data

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const storedUserData = localStorage.getItem('userData');
    
    if (token && storedUserType) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
      setUserData(storedUserData ? JSON.parse(storedUserData) : null);
      
      // Only fetch data for admin users
      if (storedUserType === 'admin') {
        Promise.all([fetchPoles(), fetchDirectors(), fetchNTs()])
          .catch(error => console.error('Failed to fetch data:', error));
      }
    }
  }, []);

  const fetchPoles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/poles`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to fetch poles')
      const data = await response.json()
      setPoles(data)
    } catch (error) {
      console.error('Error fetching poles:', error)
    }
  }

  const fetchDirectors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/directors`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to fetch directors')
      const data = await response.json()
      setDirectors(data)
    } catch (error) {
      console.error('Error fetching directors:', error)
    }
  }

  const fetchNTs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/nts`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to fetch NTs')
      const data = await response.json()
      setNTs(data)
    } catch (error) {
      console.error('Error fetching NTs:', error)
    }
  }

  const handleAddPole = async (newPole) => {
    try {
      const token = localStorage.getItem('token');
      const createdPole = await addPole(newPole, token);
      setPoles(prev => [...prev, createdPole]);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const handleAddDirector = async (newDirector) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/directors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newDirector)
      })
      if (!response.ok) throw new Error('Failed to add director')
      const data = await response.json()
      setDirectors([...directors, data])
    } catch (error) {
      console.error('Error adding director:', error)
    }
  }

  const handleAddNT = async (newNT) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/nts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newNT)
      })
      if (!response.ok) throw new Error('Failed to add NT')
      const data = await response.json()
      setNTs([...nts, data])
    } catch (error) {
      console.error('Error adding NT:', error)
    }
  }

  const handleSavePassword = async (poleId, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/poles/${poleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ password: newPassword })
      })
      if (!response.ok) throw new Error('Failed to update password')
      setPoles(poles.map(pole => 
        pole.id === poleId ? { ...pole, password: newPassword } : pole
      ))
    } catch (error) {
      console.error('Error updating password:', error)
    }
  }

  const handleDeletePole = async (poleId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/poles/${poleId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to delete pole')
      setPoles(poles.filter(pole => pole.id !== poleId))
    } catch (error) {
      console.error('Error deleting pole:', error)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  const handleLogin = (loginData) => {
    const staticToken = 'my_static_app_token_123'
    localStorage.setItem('token', staticToken)
    localStorage.setItem('userType', loginData.userType)
    localStorage.setItem('userData', JSON.stringify(loginData.poleData || {}))
    
    setIsAuthenticated(true)
    setUserType(loginData.userType)
    setUserData(loginData.poleData || null)
    
    // Only fetch data for admin users
    if (loginData.userType === 'admin') {
      fetchPoles()
      fetchDirectors()
      fetchNTs()
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    localStorage.removeItem('userData')
    setIsAuthenticated(false)
    setUserType(null)
    setUserData(null)
    setActiveView("dashboard")
  }

  // Render based on authentication and user type
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  // Render admin interface
  if (userType === 'admin') {
    return (
      <div className="app-container">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          isVisible={isSidebarVisible}
          onLogout={handleLogout}
        />
        <div className={`content-container ${isSidebarVisible ? "sidebar-open" : ""}`}>
          <Header toggleSidebar={toggleSidebar} onLogout={handleLogout} />
          <MainContent 
            activeView={activeView}
            setActiveView={setActiveView}
            poles={poles}
            directors={directors}
            nts={nts}
            onAddPole={handleAddPole}
            onAddDirector={handleAddDirector}
            onAddNT={handleAddNT}
            onSavePassword={handleSavePassword}
            onDeletePole={handleDeletePole}
          />
        </div>
      </div>
    )
  }

  // Render pole interface (Medical Work Tracker)
  if (userType === 'pole') {
    return <ChefChantier userData={userData} onLogout={handleLogout} />
  }

  // Fallback (shouldn't reach here)
  return <LoginPage onLogin={handleLogin} />
}

export default App;