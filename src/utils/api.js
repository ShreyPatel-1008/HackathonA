// File: src/utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  // Helper to handle fetch with error checking
  async fetchData(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if needed: Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  // Fetch all events for a user
  async getEvents() {
    // Mock data (replace with real API call)
    return [
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
    // Uncomment for real API:
    // return this.fetchData('/events');
  },

  // Fetch details for a specific event
  async getEvent(eventId) {
    // Mock data (replace with real API call)
    return {
      id: eventId,
      name: 'Team Camping Trip',
      date: '2025-05-15',
      location: 'Yosemite National Park',
      description: 'A fun group camping adventure!',
      members: [
        { id: '1', name: 'Alice', role: 'owner' },
        { id: '2', name: 'Bob', role: 'admin' },
        { id: '3', name: 'Charlie', role: 'member' },
        { id: '4', name: 'Diana', role: 'viewer' },
      ],
      checklists: [
        { id: 'cl1', name: 'Camping Gear', categories: ['Tents', 'Sleeping Bags'], itemCount: 10 },
        { id: 'cl2', name: 'Food Supplies', categories: ['Meals', 'Snacks'], itemCount: 15 },
      ],
    };
    // Uncomment for real API:
    // return this.fetchData(`/events/${eventId}`);
  },

  // Fetch a specific checklist
  async getChecklist(eventId, checklistId) {
    // Mock data (replace with real API call)
    return {
      id: checklistId,
      name: 'Camping Gear',
      description: 'Essential gear for the camping trip',
      categories: [
        {
          name: 'Tents',
          items: [
            { id: 'i1', name: '2-Person Tent', status: 'to-pack', assignedTo: 'Alice' },
            { id: 'i2', name: 'Tent Stakes', status: 'packed', assignedTo: 'Bob' },
          ],
        },
        {
          name: 'Sleeping Bags',
          items: [
            { id: 'i3', name: 'Sleeping Bag', status: 'delivered', assignedTo: 'Charlie' },
          ],
        },
      ],
      members: [
        { id: '1', name: 'Alice', role: 'owner' },
        { id: '2', name: 'Bob', role: 'admin' },
        { id: '3', name: 'Charlie', role: 'member' },
      ],
    };
    // Uncomment for real API:
    // return this.fetchData(`/events/${eventId}/checklists/${checklistId}`);
  },

  // Add a new item to a checklist
  async addItem(eventId, checklistId, itemData) {
    // Mock response (replace with real API call)
    return {
      id: `i${Date.now()}`,
      name: itemData.name,
      status: 'to-pack',
      assignedTo: itemData.assignedTo || 'Unassigned',
    };
    // Uncomment for real API:
    // return this.fetchData(`/events/${eventId}/checklists/${checklistId}/items`, {
    //   method: 'POST',
    //   body: JSON.stringify(itemData),
    // });
  },

  // Update an item's status
  async updateItemStatus(eventId, checklistId, itemId, status) {
    // Mock response (replace with real API call)
    return { id: itemId, status };
    // Uncomment for real API:
    // return this.fetchData(`/events/${eventId}/checklists/${checklistId}/items/${itemId}`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ status }),
    // });
  },

  // Update user settings
  async updateUser(userId, userData) {
    // Mock response (replace with real API call)
    return userData;
    // Uncomment for real API:
    // return this.fetchData(`/users/${userId}`, {
    //   method: 'PATCH',
    //   body: JSON.stringify(userData),
    // });
  },
};

export default api;