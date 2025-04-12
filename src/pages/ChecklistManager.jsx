// File: src/pages/ChecklistManager.js
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../components/AuthContext";

export function ChecklistManager() {
  const { eventId, checklistId } = useParams();
  const { user } = useContext(AuthContext);
  const [checklist, setChecklist] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    assignedTo: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch checklist details (replace with real API)
    const fetchChecklist = async () => {
      try {
        // Example: const response = await fetch(`/api/events/${eventId}/checklists/${checklistId}`, { headers: { Authorization: `Bearer ${user.token}` } });
        const mockChecklist = {
          id: checklistId,
          name: "Camping Gear",
          description: "Essential gear for the camping trip",
          categories: [
            {
              name: "Tents",
              items: [
                {
                  id: "i1",
                  name: "2-Person Tent",
                  status: "to-pack",
                  assignedTo: "Alice",
                },
                {
                  id: "i2",
                  name: "Tent Stakes",
                  status: "packed",
                  assignedTo: "Bob",
                },
              ],
            },
            {
              name: "Sleeping Bags",
              items: [
                {
                  id: "i3",
                  name: "Sleeping Bag",
                  status: "delivered",
                  assignedTo: "Charlie",
                },
              ],
            },
          ],
          members: [
            { id: "1", name: "Alice", role: "owner" },
            { id: "2", name: "Bob", role: "admin" },
            { id: "3", name: "Charlie", role: "member" },
          ],
        };
        setChecklist(mockChecklist);
      } catch (err) {
        console.error("Failed to fetch checklist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChecklist();
  }, [eventId, checklistId]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category) return;

    // Mock API call to add item (replace with real API)
    try {
      // Example: await fetch(`/api/events/${eventId}/checklists/${checklistId}/items`, { method: 'POST', body: JSON.stringify(newItem) });
      const updatedChecklist = { ...checklist };
      const category = updatedChecklist.categories.find(
        (c) => c.name === newItem.category
      ) || {
        name: newItem.category,
        items: [],
      };
      category.items.push({
        id: `i${Date.now()}`,
        name: newItem.name,
        status: "to-pack",
        assignedTo: newItem.assignedTo || "Unassigned",
      });
      if (!updatedChecklist.categories.includes(category)) {
        updatedChecklist.categories.push(category);
      }
      setChecklist(updatedChecklist);
      setNewItem({ name: "", category: "", assignedTo: "" });
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const handleStatusChange = async (itemId, categoryName, newStatus) => {
    // Mock API call to update item status (replace with real API)
    try {
      // Example: await fetch(`/api/events/${eventId}/checklists/${checklistId}/items/${itemId}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
      const updatedChecklist = { ...checklist };
      const category = updatedChecklist.categories.find(
        (c) => c.name === categoryName
      );
      const item = category.items.find((i) => i.id === itemId);
      item.status = newStatus;
      setChecklist(updatedChecklist);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return <div className="loading">Loading checklist...</div>;
  }

  if (!checklist) {
    return <div>Checklist not found</div>;
  }

  const totalItems = checklist.categories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );
  const packedItems = checklist.categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.status === "packed").length,
    0
  );
  const deliveredItems = checklist.categories.reduce(
    (sum, cat) =>
      sum + cat.items.filter((i) => i.status === "delivered").length,
    0
  );
  const progress = totalItems
    ? Math.round(((packedItems + deliveredItems) / totalItems) * 100)
    : 0;

  return (
    <div>
      <div className="checklist-header">
        <h1>{checklist.name}</h1>
        <p className="checklist-description">{checklist.description}</p>
      </div>
      <div className="checklist-progress-summary">
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-label">Total Items</span>
            <span className="stat-value">{totalItems}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Packed</span>
            <span className="stat-value">{packedItems}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Delivered</span>
            <span className="stat-value">{deliveredItems}</span>
          </div>
        </div>
        <div className="overall-progress">
          <div className="progress-label">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="checklist-actions">
        <form className="add-item-form" onSubmit={handleAddItem}>
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          />
          <select
            value={newItem.assignedTo}
            onChange={(e) =>
              setNewItem({ ...newItem, assignedTo: e.target.value })
            }
          >
            <option value="">Unassigned</option>
            {checklist.members.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Item</button>
        </form>
      </div>
      {checklist.categories.map((category) => (
        <div key={category.name} className="category-section">
          <div className="category-header">
            <h3>{category.name}</h3>
          </div>
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {category.items.map((item) => (
                <tr key={item.id} className={`status-${item.status}`}>
                  <td>{item.name}</td>
                  <td>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          category.name,
                          e.target.value
                        )
                      }
                      disabled={user.role === "viewer"}
                    >
                      <option value="to-pack">To Pack</option>
                      <option value="packed">Packed</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td>{item.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ChecklistManager;
