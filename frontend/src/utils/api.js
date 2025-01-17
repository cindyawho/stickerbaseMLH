import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api'});

export const uploadImage = async (formData) => {
    const response = await api.post('/upload', formData, {
        headers: {
            'Content-Type' : 'multipart/form-data',
        },
    });
    return response.data;
}

export const fetchImages = async () => {
    const response = await api.get('/images');
    return response.data;
}