import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/blueprints',
    withCredentials: true // Important for JWT cookies
});

export const generateBlueprint = async (transcript) => {
    const response = await api.post('/', { transcript });
    return response.data;
};

export const getBlueprintById = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const getAllBlueprints = async () => {
    const response = await api.get('/');
    return response.data;
};