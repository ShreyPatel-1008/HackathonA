// File: src/pages/Dashboard.js
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch events (replace with real API)
    const fetchEvents = async () => {
      try {
        // Example: const response = await fetch('/api/events', { headers: { Authorization: `Bearer ${user.token}` } });
        const mockEvents = [
          {
            id: '1',
            name: 'Team Camping Trip',
            date: '2025-05-15',
            location: 'Yosemite National Park',
            progress: 60,
          },
          {
            id: '2',
            name: 'Family Reunion',
            date: '2025-06-20',
            location: 'Lake Tahoe',
            progress: 30,
          },
        ];
        setEvents(mockEvents);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <button className="button">Create Event</button>
      </div>
      {events.length === 0 ? (
        <p>No events found. Create one to get started!</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <Link
              to={`/event/${event.id}`}
              key={event.id}
              className="event-card"
            >
              <h3>{event.name}</h3>
              <div className="event-info">
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
              </div>
              <div className="event-progress">
                <div className="progress-label">
                  <span>Progress</span>
                  <span>{event.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${event.progress}%` }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;