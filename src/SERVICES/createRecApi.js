import axios from 'axios';

const createRecApi = axios.create({
    baseURL: 'http://localhost:8000/admin/createReciepe'
});

export const getCrtRcp = () => createRecApi.get('/');

export const getOldReciepeById = (id) => createRecApi.get(`/${id}`);

export const createRecipe = (recipeData) => createRecApi.post('/', recipeData);