import { AxiosInstance } from 'axios'
import { BASE_URL } from './index'

export default (axios: AxiosInstance) => ({
  getFeedLatest () {
    return axios.get(`${BASE_URL}/api/v1/feed/latest`)
  }
})
