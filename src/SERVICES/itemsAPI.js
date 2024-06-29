import axios from "axios";

const itemApi = axios.create({
    baseURL: 'http://localhost:8000/admin/items'
})

export const getItems = () => itemApi.get('/');

export const additems = (itemsData) => itemApi.post('/', itemsData);