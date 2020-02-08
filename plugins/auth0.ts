// import Vue from 'vue'
import auth0 from 'auth0-js'
import { DefaultAuth0Profile } from '@/models/api/users/auth0'

const LOGOUT_URL = process.env.NUXT_ENV_URL || ''
const CLIENT_ID = process.env.NUXT_ENV_OAUTH_CLIENT_ID || ''
const CLIENT_DOMAIN = process.env.NUXT_ENV_OAUTH_CLIENT_DOMAIN || ''
const REDIRECT = process.env.NUXT_ENV_URL + '/callback'
const SCOPE = 'openid email'
const AUDIENCE = process.env.NUXT_ENV_OAUTH_AUDIENCE || ''

const webAuth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
})

interface Storage {
  getItem (key: string): string | null;
  setItem (key: string, value: string): void;
  removeItem (key: string): void;
}

class ServerStorage {
  // eslint-disable-next-line
  getItem (key: string): string | null {
    return null
  }

  // eslint-disable-next-line
  setItem (key: string, value: string): void {
  }

  // eslint-disable-next-line
  removeItem (key: string): void {
  }
}

class Auth {
    private storage: Storage = new ServerStorage();

    private memToken: string = '';

    private memAccessToken: string = '';

    private memExpiresAt: number = -1;

    private memUser: DefaultAuth0Profile = new DefaultAuth0Profile();

    constructor () {
      if (process.browser) {
        this.storage = localStorage
      }
    }

    set token (token: string) {
      this.storage.setItem('id_token', token)
      this.memToken = token
    }

    get token (): string {
      if (this.memToken.length === 0) {
        this.memToken = String(this.storage.getItem('id_token'))
      }
      return this.memToken
    }

    get accessToken (): string {
      if (this.memAccessToken.length === 0) {
        this.memAccessToken = String(this.storage.getItem('access_token'))
      }
      return this.memAccessToken
    }

    set accessToken (accessToken: string) {
      this.storage.setItem('access_token', accessToken)
      this.memAccessToken = accessToken
    }

    get expiresAt (): number {
      if (this.memExpiresAt === -1) {
        this.memExpiresAt = Number(this.storage.getItem('expires_at'))
      }
      return this.memExpiresAt
    }

    set expiresAt (expiresIn: number) {
      this.memExpiresAt = expiresIn * 1000 + new Date().getTime()
      const expiresAt = JSON.stringify(this.memExpiresAt)
      this.storage.setItem('expires_at', expiresAt)
    }

    get user (): DefaultAuth0Profile {
      if (this.memUser.email === '') {
        this.memUser = JSON.parse(String(this.storage.getItem('user')))
      }
      return this.memUser
    }

    set user (user: DefaultAuth0Profile) {
      this.memUser = user
      this.storage.setItem('user', JSON.stringify(user))
    }

    public login () {
      webAuth.authorize({
        responseType: 'token id_token',
        redirectUri: REDIRECT,
        audience: AUDIENCE,
        scope: SCOPE
      })
    }

    public logout () {
      return new Promise((resolve) => {
        this.storage.removeItem('access_token')
        this.storage.removeItem('id_token')
        this.storage.removeItem('expires_at')
        this.storage.removeItem('user')
        webAuth.logout({
          returnTo: LOGOUT_URL, // Allowed logout URL listed in dashboard
          clientID: CLIENT_ID // Your client ID
        })
        resolve()
      })
    }

    public isAuthenticated () {
      return new Date().getTime() < Number(this.expiresAt)
    }

    public userInfo () {
      return this.user
    }

    public handleAuthentication () {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err: auth0.Auth0ParseHashError | null, authResult: auth0.Auth0DecodedHash | null) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = Number(authResult.expiresIn)
            this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload
            resolve()
          } else if (err) {
            this.logout()
            reject(err)
          }
        })
      })
    }
}

const plugin = new Auth()

export function getAccessToken () {
  return plugin.accessToken
}

export function userInfo (): any {
  return plugin.user
}

const P = {
  install: (vue) => {
    vue.prototype.$auth = plugin
  }
}

// Vue.use(P)

export default P

// declare module 'vue/types/vue' {
//     interface Vue {
//       $auth: Auth;
//     }
// }
