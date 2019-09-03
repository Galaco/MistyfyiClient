import axios from 'axios';
import {getAccessToken} from './auth';

const BASE_URL = process.env.VUE_APP_API_URL;

function getWatchedLevels() {
    const url = `${BASE_URL}/api/v1/levels/list`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

function addWatchedLevel(name: string) {
    const url = `${BASE_URL}/api/v1/levels/add`;
    const data = {
        name,
    };
    return axios.put(url, data, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

function deleteWatchedLevel(name: string) {
    const url = `${BASE_URL}/api/v1/levels/remove`;
    return axios.delete(url,
        {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
            data: {
                name,
            },
        });
}

export {
    getWatchedLevels,
    addWatchedLevel,
    deleteWatchedLevel,
};
