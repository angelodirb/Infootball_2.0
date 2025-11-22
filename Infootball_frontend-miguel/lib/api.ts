// Frontend - lib/api.ts - VERSION CORREGIDA

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'; 

// Helper para manejar errores
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la petición');
  }
  return response.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// MATCHES
export const matchesApi = {
  getByDate: (date: string) => fetch(`${API_URL}/matches/date?date=${date}`).then(handleResponse),
  getLive: () => fetch(`${API_URL}/matches/live`).then(handleResponse),
  getAll: () => fetch(`${API_URL}/matches`).then(handleResponse),
  testApi: () => fetch(`${API_URL}/matches/test-api`).then(handleResponse),
};

// COMPETITIONS
export const competitionsApi = {
  getAll: () => fetch(`${API_URL}/competitions`).then(handleResponse),
  getById: (id: number) => fetch(`${API_URL}/competitions/${id}`).then(handleResponse),
  getStandings: (id: number) => fetch(`${API_URL}/competitions/${id}/standings`).then(handleResponse),
};

// NEWS
export const newsApi = {
  getAll: () => fetch(`${API_URL}/news`).then(handleResponse),
  getById: (id: number) => fetch(`${API_URL}/news/${id}`).then(handleResponse),
  getByCategory: (category: string) => fetch(`${API_URL}/news?category=${category}`).then(handleResponse),
};

// TRANSFERS
export const transfersApi = {
  getAll: () => fetch(`${API_URL}/transfers`).then(handleResponse),
  getFeatured: () => fetch(`${API_URL}/transfers/featured`).then(handleResponse),
};

// ✅ AUTH - ACTUALIZADO Y FUNCIONAL
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};