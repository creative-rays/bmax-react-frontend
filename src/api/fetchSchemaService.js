import axios from 'axios';

const fetchSchemaData = async () => {
  try {
    const response = await axios.get('https://schema.postman.com/json/collection/v2.1.0/collection.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching schema data:', error);
    throw error;
  }
};

export default fetchSchemaData;
