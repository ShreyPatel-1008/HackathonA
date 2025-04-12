// File: src/components/Navbar.js
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">PackPal</Link>
      </div>
      <div className="navbar-menu">
        {user && (
          <div className="user-info">
            <span>{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
        )}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;