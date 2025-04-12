// File: src/App.js
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import api from "./utils/api";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import ChecklistManager from "./pages/ChecklistManager";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AuthContext from "./components/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("packpal_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("packpal_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("packpal_user");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="app">
          {user && <Navbar />}
          <div className="content-wrapper">
            {user && <Sidebar />}
            <main className="main-content">
              <Routes>
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/dashboard" />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/event/:eventId"
                  element={
                    <ProtectedRoute>
                      <EventDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/event/:eventId/checklist/:checklistId"
                  element={
                    <ProtectedRoute>
                      <ChecklistManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/"
                  element={<Navigate to={user ? "/dashboard" : "/login"} />}
                />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
