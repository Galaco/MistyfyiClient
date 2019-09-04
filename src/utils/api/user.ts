import axios from 'axios';
import { getAccessToken } from '../../plugins/auth0';

const BASE_URL = process.env.VUE_APP_API_URL;

function getUserProfile() {
    const url = `${BASE_URL}/api/v1/user/profile`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
}

export {
    getUserProfile,
};
