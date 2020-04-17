import { AxiosInstance } from 'axios'
import { BASE_URL } from './index'

export interface Popular {
  getPopular(): Promise<any>
}

export default (axios: AxiosInstance) => ({
  getPopular () {
    return axios.get(`${BASE_URL}/api/v1/popular`)
  }
})
