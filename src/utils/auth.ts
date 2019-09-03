import JwtDecode from 'jwt-decode';
import auth0 from 'auth0-js';
import Router from 'vue-router';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = process.env.VUE_APP_OAUTH_CLIENT_ID;
const CLIENT_DOMAIN = process.env.VUE_APP_OAUTH_CLIENT_DOMAIN;
const REDIRECT = process.env.VUE_APP_URL + '/callback';
const SCOPE = 'openid email';
const AUDIENCE = process.env.VUE_APP_OAUTH_AUDIENCE;


interface TokenDto {
    foo: string;
    exp: number;
    iat: number;
}


const auth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN,
});

export function login() {
    auth.authorize({
        responseType: 'token id_token',
        redirectUri: REDIRECT,
        audience: AUDIENCE,
        scope: SCOPE,
    });
}

const router = new Router({
    mode: 'history',
});

export function logout() {
    clearIdToken();
    clearAccessToken();
    router.push('/');
}

export function reauthenticate() {
    clearIdToken();
    clearAccessToken();
    login();
}

export function requireAuth(to: any, from: any, next: any) {
    if (!isLoggedIn()) {
        next({
            path: '/',
            query: { redirect: to.fullPath },
        });
    } else {
        next();
    }
}

export function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name: string) {
    const match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
    const accessToken = getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, String(accessToken));
}

// Get and store id_token in local storage
export function setIdToken() {
    const idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, String(idToken));
}

export function isLoggedIn() {
    const idToken = getIdToken();
    if (idToken == null) {
        return false;
    }
    return (!!idToken && !isTokenExpired(idToken));
}

function getTokenExpirationDate(encodedToken: string) {
    const token = JwtDecode<TokenDto>(encodedToken);
    const date = new Date(0);
    if (!token.exp) {
        return date;
    }

    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token: string) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}
