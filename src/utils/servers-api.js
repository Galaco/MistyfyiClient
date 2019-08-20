import axios from 'axios';
import { getAccessToken } from './auth';

const BASE_URL = process.env.VUE_APP_API_URL;

function getServerStatuses() {
    const url = `${BASE_URL}/api/v1/servers/list`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

function addNewServer(ip, port) {
    const url = `${BASE_URL}/api/v1/servers/add`;
    const data = {
      ip: ip,
      port: port,
    };
    return axios.put(url, data, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}

function deleteServer(ip, port) {
    const url = `${BASE_URL}/api/v1/servers/remove`;
    return axios.delete(url,
        {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
            data: {
                ip: ip,
                port: port
            }
        }).then(response => response.data);
}



function getWatchedLevels() {
    const url = `${BASE_URL}/api/v1/levels/list`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

function addWatchedLevel(name) {
    const url = `${BASE_URL}/api/v1/levels/add`;
    const data = {
        name: name,
    };
    return axios.put(url, data, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

function deleteWatchedLevel(name) {
    const url = `${BASE_URL}/api/v1/levels/remove`;
    return axios.delete(url,
        {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
            data: {
                name: name,
            }
        }).then(response => response.data);
}

function getServerHistory(id) {
    const url = `${BASE_URL}/api/v1/server/history/${id}`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

export {
    getServerStatuses,
    addNewServer,
    deleteServer,
    getWatchedLevels,
    addWatchedLevel,
    deleteWatchedLevel,
    getServerHistory
};
