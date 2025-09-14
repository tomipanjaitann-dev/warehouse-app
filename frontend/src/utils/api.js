import axios from 'axios';
const API_URL = 'http://localhost:5000/api';

export const fetchPackages = () => axios.get(`${API_URL}/packages`);
export const addPackage = (data) => axios.post(`${API_URL}/packages`, data);
export const deletePackage = (id) => axios.delete(`${API_URL}/packages/${id}`);
export const exportExcel = () => window.open(`${API_URL}/packages/export`, '_blank');
