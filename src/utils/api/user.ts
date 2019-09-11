import axios from 'axios';
import { service, BASE_URL } from './index';
import { getAccessToken } from '../../plugins/auth0';

const getUserProfile = () => {
    const url = `${BASE_URL}/api/v1/user/profile`;
    return service.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
};

const sendContactRequest = (email: string, message: string, recaptcha: string) => {
    const url = `${BASE_URL}/api/v1/user/contact/request`;
    const data = {
      email,
      message,
      recaptcha,
    };
    return service.post(url, data, { headers: { Authorization: `Bearer ${getAccessToken()}` }});
};

export {
    getUserProfile,
    sendContactRequest,
};
