import { normalizeResponse } from './transform'

export const BASE_URL = process.env.NUXT_ENV_API_URL

export default ($axios: any, $auth: any) => {
  const service = $axios.create({})

  const success = (data: any): any => {
    return Promise.resolve(normalizeResponse(data))
  }
  const failure = (data: any): any => {
    return Promise.reject(normalizeResponse(data))
  }

  service.interceptors.request.use(function (config: any) {
    config.headers.Authorization = `Bearer ${$auth.token}`
    return config
  })

  service.interceptors.response.use(success, failure)

  return service
}
