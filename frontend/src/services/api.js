const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    return res.json();
  },

  // Athletes
  async getAthletes(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/athletes?${query}`);
    return res.json();
  },

  async getAthleteById(id) {
    const res = await fetch(`${API_BASE}/athletes/${id}`);
    return res.json();
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/athletes/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async toggleSaveAthlete(id) {
    const res = await fetch(`${API_BASE}/athletes/${id}/save`, {
      method: 'POST',
      headers: getHeaders()
    });
    return res.json();
  },

  // Opportunities
  async getOpportunities(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/opportunities?${query}`);
    return res.json();
  },

  async getOpportunityById(id) {
    const res = await fetch(`${API_BASE}/opportunities/${id}`);
    return res.json();
  },

  async createOpportunity(data) {
    const res = await fetch(`${API_BASE}/opportunities`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async toggleSaveOpportunity(id) {
    const res = await fetch(`${API_BASE}/opportunities/${id}/save`, {
      method: 'POST',
      headers: getHeaders()
    });
    return res.json();
  },

  // Applications
  async applyToOpportunity(opportunityId, coverNote) {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ opportunityId, coverNote })
    });
    return res.json();
  },

  async getApplications() {
    const res = await fetch(`${API_BASE}/applications`, {
      headers: getHeaders()
    });
    return res.json();
  },

  async updateApplicationStatus(id, status, feedback) {
    const res = await fetch(`${API_BASE}/applications/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status, feedback })
    });
    return res.json();
  },

  // Sports & News
  async getSports() {
    const res = await fetch(`${API_BASE}/sports`);
    return res.json();
  },

  async getSportsNews() {
    const res = await fetch(`${API_BASE}/sports/news`);
    return res.json();
  },

  // Messages & Notifications
  async getMessages() {
    const res = await fetch(`${API_BASE}/messages`, { headers: getHeaders() });
    return res.json();
  },

  async sendMessage(recipientId, subject, content) {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ recipientId, subject, content })
    });
    return res.json();
  },

  async getNotifications() {
    const res = await fetch(`${API_BASE}/notifications`, { headers: getHeaders() });
    return res.json();
  },

  // Contact
  async submitContact(data) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Performance & Achievements
  async addPerformance(data) {
    const res = await fetch(`${API_BASE}/performance`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async addAchievement(data) {
    const res = await fetch(`${API_BASE}/achievements`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, { headers: getHeaders() });
    return res.json();
  },

  async getAdminUsers() {
    const res = await fetch(`${API_BASE}/admin/users`, { headers: getHeaders() });
    return res.json();
  },

  async toggleVerifyUser(id) {
    const res = await fetch(`${API_BASE}/admin/users/${id}/verify`, {
      method: 'PUT',
      headers: getHeaders()
    });
    return res.json();
  },

  async getContactMessages() {
    const res = await fetch(`${API_BASE}/admin/contacts`, { headers: getHeaders() });
    return res.json();
  }
};
