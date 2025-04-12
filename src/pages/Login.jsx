// File: src/pages/Login.js
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

function Login() {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Mock API call (replace with real API endpoint)
    try {
      // Example: const response = await fetch('/api/login', { ... });
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'member', // Default role; adjust based on your API response
      };
      login(mockUser); // Update context with user data
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1>PackPal</h1>
        <h2>Log in to your account</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;