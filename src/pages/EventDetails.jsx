// File: src/pages/EventDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const mockEvent = {
          id: eventId,
          name: "Team Camping Trip",
          date: "2025-05-15",
          location: "Yosemite National Park",
          description: "A fun group camping adventure!",
          members: [
            { id: "1", name: "Alice", role: "owner" },
            { id: "2", name: "Bob", role: "admin" },
            { id: "3", name: "Charlie", role: "member" },
            { id: "4", name: "Diana", role: "viewer" },
          ],
          checklists: [
            {
              id: "cl1",
              name: "Camping Gear",
              categories: ["Tents", "Sleeping Bags"],
              itemCount: 10,
            },
            {
              id: "cl2",
              name: "Food Supplies",
              categories: ["Meals", "Snacks"],
              itemCount: 15,
            },
          ],
        };
        setEvent(mockEvent);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div className="loading">Loading event...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <div className="event-header">
        <h1>{event.name}</h1>
        <div className="event-actions">
          <button className="button">Edit Event</button>
          <button className="button">Add Checklist</button>
        </div>
      </div>
      <div className="event-info-card">
        <div className="info-section">
          <h3>Event Details</h3>
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
        </div>
        <div className="members-section">
          <h3>Members</h3>
          <div className="members-list">
            {event.members.map((member) => (
              <div key={member.id} className="member-item">
                <span>{member.name}</span>
                <span className={`member-role ${member.role}`}>
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-header">
        <h2>Checklists</h2>
        <button className="button">Create Checklist</button>
      </div>
      {event.checklists.length === 0 ? (
        <p>No checklists found. Create one to get started!</p>
      ) : (
        <div className="checklists-grid">
          {event.checklists.map((checklist) => (
            <Link
              to={`/event/${eventId}/checklist/${checklist.id}`}
              key={checklist.id}
              className="checklist-card"
            >
              <h3>{checklist.name}</h3>
              <div className="categories">
                {checklist.categories.map((category, index) => (
                  <span key={index} className="category-tag">
                    {category}
                  </span>
                ))}
              </div>
              <div className="item-count">{checklist.itemCount} items</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventDetails;
