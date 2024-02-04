// ApiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const ApiService = {
    setAuthToken: (token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    getData: async (path) => {
        try {
            const response = await axios.get(`${BASE_URL}/${path}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    postData: async (path, data) => {
        try {
            const response = await axios.post(`${BASE_URL}/${path}`, data);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    },

    putData: async (path, updatedData) => {
        try {
            const response = await axios.put(`${BASE_URL}/${path}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    },

    deleteData: async (path) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${path}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    },
};

export default ApiService;
