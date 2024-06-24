import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const fetchData = async (action, additionalData = {}) => {
  try {
    const response = await axios.post(`${API_URL}/create_order`, {
      action,
      ...additionalData
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Example API functions
export const createOrder = async (orderData) => fetchData('create_order', orderData);
