import auth0 from 'auth0-js';
import Router from 'vue-router';
import { Auth0Profile, DefaultAuth0Profile } from '@/models/api/users/auth0';

const LOGOUT_URL = process.env.VUE_APP_URL;
const CLIENT_ID = process.env.VUE_APP_OAUTH_CLIENT_ID;
const CLIENT_DOMAIN = process.env.VUE_APP_OAUTH_CLIENT_DOMAIN;
const REDIRECT = process.env.VUE_APP_URL + '/callback';
const SCOPE = 'openid email';
const AUDIENCE = process.env.VUE_APP_OAUTH_AUDIENCE;



const webAuth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN,
});

class Auth {
    private memToken: string = '';

    private memAccessToken: string = '';

    private memExpiresAt: number = -1;

    private memUser: Auth0Profile = new DefaultAuth0Profile();

    set token(token: string) {
        localStorage.setItem('id_token', token);
        this.memToken = token;
    }
    get token(): string {
        if (this.memToken.length === 0) {
            this.memToken = String(localStorage.getItem('id_token'));
        }
        return this.memToken;
    }

    get accessToken(): string {
        if (this.memAccessToken.length === 0) {
            this.memAccessToken = String(localStorage.getItem('access_token'));
        }
        return this.memAccessToken;
    }
    set accessToken(accessToken: string) {
        localStorage.setItem('access_token', accessToken);
        this.memAccessToken = accessToken;
    }

    get expiresAt(): number {
        if (this.memExpiresAt === -1) {
            this.memExpiresAt = Number(localStorage.getItem('expires_at'));
        }
        return this.memExpiresAt;
    }
    set expiresAt(expiresIn: number) {
        this.memExpiresAt = expiresIn * 1000 + new Date().getTime();
        const expiresAt = JSON.stringify(this.memExpiresAt);
        localStorage.setItem('expires_at', expiresAt);
    }

    get user(): Auth0Profile {
        if (this.memUser.email === '') {
            this.memUser = JSON.parse(String(localStorage.getItem('user')));
        }
        return this.memUser;
    }
    set user(user: Auth0Profile) {
        this.memUser = user;
        localStorage.setItem('user', JSON.stringify(user));
    }

    public login() {
        webAuth.authorize({
            responseType: 'token id_token',
            redirectUri: REDIRECT,
            audience: AUDIENCE,
            scope: SCOPE,
        });
    }
    public logout() {
        return new Promise((resolve, reject) => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('id_token');
          localStorage.removeItem('expires_at');
          localStorage.removeItem('user');
          webAuth.logout({
            returnTo: LOGOUT_URL, // Allowed logout URL listed in dashboard
            clientID: CLIENT_ID, // Your client ID
          });
        });
    }
    public isAuthenticated() {
        return new Date().getTime() < Number(this.expiresAt);
    }
    public userInfo() {
        return this.user;
    }
    public handleAuthentication() {
        return new Promise((resolve, reject) => {
          webAuth.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              this.expiresAt = Number(authResult.expiresIn);
              this.accessToken = authResult.accessToken;
              this.token = authResult.idToken;
              this.user = authResult.idTokenPayload;
              resolve();
            } else if (err) {
              this.logout();
              reject(err);
            }
          });
        });
    }
}

const plugin = new Auth();

export function getAccessToken() {
    return plugin.accessToken;
}

export function userInfo(): any {
    return plugin.user;
}

export default {
  install: (vue) => {
      vue.prototype.$auth = plugin;
  },
};

declare module 'vue/types/vue' {
    interface Vue {
      $auth: Auth;
    }
}
