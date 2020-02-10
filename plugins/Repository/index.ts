import { AxiosInstance, AxiosStatic } from 'axios'
import { normalizeResponse } from './transform'

export const BASE_URL = process.env.NUXT_ENV_API_URL

export default ($axios: AxiosStatic): AxiosInstance => {
  // const token = $auth.getToken('auth0')

  const service = $axios.create()

  const success = (data: any): any => {
    return Promise.resolve(normalizeResponse(data))
  }
  const failure = (data: any): any => {
    return Promise.reject(normalizeResponse(data))
  }

  service.interceptors.response.use(success, failure)
  // service.setToken(token)
  return service
}
