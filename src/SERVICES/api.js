import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/admin/vendor'
})

export const getVendors = () => api.get('/');

export const addVendor = (vendorData) => api.post('/', vendorData)