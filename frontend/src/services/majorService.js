import axios from 'axios';

const API_URL = 'http://localhost:5000/api/search/majors';

export const majorService = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      // res.data = { success, count, data }
      const { success, data } = res.data;
      if (success && Array.isArray(data)) {
        return { success: true, majors: data };
      } else {
        return { success: false, error: 'Invalid payload structure' };
      }
    } catch (error) {
      console.error('Error fetching majors:', error);
      return { success: false, error: error.message };
    }
  }
};
