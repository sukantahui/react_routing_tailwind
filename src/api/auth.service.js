// authService.js
import api from './api';

export const authService = {
  saveGuest: async (data) => {
    try {
      const response = await api.post('/dev/guests', data);
      return response.data;
    } catch (error) {
      console.error('Error saving guest:', error);
      throw error;
    }
  },

  getAllGuest: async () => {
    try {
      const response = await api.get('/dev/guests');
      return response.data;
    } catch (error) {
      console.error('Error loading guests:', error);
      throw error;
    }
  },

  updateGuest: async (id, data) => {
    try {
      const response = await api.put(`/dev/guests/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating guest:', error);
      throw error;
    }
  },

  getPaginatedGuests: async (page = 1, perPage = 20) => {
    try {
      const response = await api.get('/guests/pagination', {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      console.error('Error loading paginated guests:', error);
      throw error;
    }
  },

  searchGuests: async (params = {}) => {
    try {
      const response = await api.get('/guests/search/any', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching guests:', error);
      throw error;
    }
  },

  deleteGuest: async (id) => {
    try {
      const response = await api.delete(`/dev/guests/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting guest:', error);
      throw error;
    }
  },
};
