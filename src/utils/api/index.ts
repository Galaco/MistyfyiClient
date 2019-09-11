import axios from 'axios';
import ApiResponse from '@/models/ApiResponse';
import { normalizeResponse } from './transform';

const BASE_URL = process.env.VUE_APP_API_URL;

const service =  axios.create({});

const success = (data: any): any => {
    return Promise.resolve(normalizeResponse(data));
};

const failure = (data: any) => {
    return Promise.reject(normalizeResponse(data));
};

service.interceptors.response.use(success, failure);

export {
    service,
    BASE_URL,
};
