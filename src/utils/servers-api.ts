import axios from 'axios';
import { getAccessToken } from './auth';

const BASE_URL = process.env.VUE_APP_API_URL;

function getServerStatuses() {
    const url = `${BASE_URL}/api/v1/servers/list`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

function addNewServer(ip: string, port: number) {
    const url = `${BASE_URL}/api/v1/servers/add`;
    const data = {
      ip,
      port,
    };
    return axios.put(url, data, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

function deleteServer(ip: string, port: number) {
    const url = `${BASE_URL}/api/v1/servers/remove`;
    return axios.delete(url,
        {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
            data: {
                ip,
                port,
            },
        });
}

export {
    getServerStatuses,
    addNewServer,
    deleteServer,
};
