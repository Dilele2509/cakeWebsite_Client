import axios from 'axios';

const BASE_URL = "http://cakeshop.gun.vn:3001/api/"

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials:true
});