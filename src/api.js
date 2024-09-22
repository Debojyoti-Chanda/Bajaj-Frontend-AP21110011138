import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;// Your backend URL

export const processData = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/bfhl`, data);
        return response.data;
    } catch (error) {
        console.error("Error processing data:", error);
        return null;
    }
};

export const getOperationCode = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/bfhl`);
        return response.data;
    } catch (error) {
        console.error("Error getting operation code:", error);
        return null;
    }
};
