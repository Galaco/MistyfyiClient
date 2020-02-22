import { AxiosInstance, AxiosStatic } from 'axios'
import ApiResponse from '@/plugins/Repository/ApiResponse'

export const BASE_URL = process.env.NUXT_ENV_API_URL

export default ($axios: AxiosStatic): AxiosInstance => {
  const service = $axios.create()

  const success = (data: any): any => {
    return Promise.resolve(normalizeResponse(data))
  }
  const failure = (data: any): any => {
    return Promise.reject(normalizeResponse(data))
  }

  service.interceptors.response.use(success, failure)

  return service
}

export const normalizeResponse = (resp: any, defaultBody: any = null): ApiResponse => {
  // Axios response
  if (resp.data && !isNaN(resp.status)) {
    return new ApiResponse(resp.data.code, resp.data.message, (resp.data.body && resp.data.body) || defaultBody)
  }

  // Response body
  if (!isNaN(resp.code)) {
    return new ApiResponse(resp.code, resp.message, (resp.body && resp.body) || defaultBody)
  }

  // Error response
  if (resp.response && resp.response.data) {
    return new ApiResponse(
      resp.response.data.code,
      resp.response.data.message,
      (resp.response.data.body && resp.response.data.body) || defaultBody)
  }

  // No response
  return new ApiResponse(500, 'Unable to communicate with the server', defaultBody)
}
