import createRepository, { BASE_URL } from './index'

export default ($axios: any, $auth: any) => () => ({
  getUserProfile () {
    return createRepository($axios, $auth).get(`${BASE_URL}/api/v1/user/profile`)
  },
  sendContactRequest (email: string, message: string, recaptcha: string) {
    return createRepository($axios, $auth).post(`${BASE_URL}/api/v1/user/contact/request`, {
      email,
      message,
      recaptcha
    })
  }
})
