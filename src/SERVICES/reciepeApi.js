import axios from "axios";

const reciepeApi = axios.create({
    baseURL: 'http://localhost:8000/admin/reciepe'
})

export const getReciepe = () => reciepeApi.get('');

export const getReciepeById = (id) => reciepeApi.get(`/${id}`);

export const addReciepe = (ReciepeData) => reciepeApi.post('/', ReciepeData);