import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000'});

export const fetchImages = async () => {
    const response = await api.get('/images');
    return response.data;
}