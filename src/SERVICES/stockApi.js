import axios from "axios";

const stockApi = axios.create({
    baseURL: 'http://localhost:8000/admin/stock'
});

export const getStock = () => stockApi.get('/');