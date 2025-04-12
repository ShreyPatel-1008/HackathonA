// File: src/pages/Settings.js
import { useState, useContext } from 'react';
import AuthContext from '../components/AuthContext';

function Settings() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    notifications: {
      emailUpdates: true,
      checklistChanges: true,
      eventInvites: true,
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [name]: checked,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Mock API call to update settings (replace with real API)
    try {
      // Example: await fetch(`/api/users/${user.id}`, { method: 'PATCH', body: JSON.stringify(formData) });
      // Update localStorage and context if needed (handled in App.jsx for now)
      localStorage.setItem('packpal_user', JSON.stringify({ ...user, ...formData }));
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Profile</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <div className="role-display">{user.role}</div>
              <div className="role-info">Your role is managed by event owners.</div>
            </div>
          </div>
          <div className="form-section">
            <h2>Notifications</h2>
            <div className="notification-option">
              <input
                type="checkbox"
                id="emailUpdates"
                name="emailUpdates"
                checked={formData.notifications.emailUpdates}
                onChange={handleNotificationChange}
              />
              <label htmlFor="emailUpdates">Receive email updates</label>
            </div>
            <div className="notification-option">
              <input
                type="checkbox"
                id="checklistChanges"
                name="checklistChanges"
                checked={formData.notifications.checklistChanges}
                onChange={handleNotificationChange}
              />
              <label htmlFor="checklistChanges">Notify on checklist changes</label>
            </div>
            <div className="notification-option">
              <input
                type="checkbox"
                id="eventInvites"
                name="eventInvites"
                checked={formData.notifications.eventInvites}
                onChange={handleNotificationChange}
              />
              <label htmlFor="eventInvites">Notify on event invites</label>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="settings-actions">
            <button type="submit" className="save-settings-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;