import { AxiosInstance } from 'axios'
import { BASE_URL } from './index'

export default (axios: AxiosInstance) => ({
  getServerStatuses () {
    return axios.get(`${BASE_URL}/api/v1/servers/list`)
  },
  addNewServer (ip: string, port: number) {
    return axios.put(`${BASE_URL}/api/v1/servers/add`, {
      ip,
      port
    })
  },
  deleteServer (ip: string, port: number) {
    return axios.delete(`${BASE_URL}/api/v1/servers/remove`, {
      data: {
        ip,
        port
      }
    })
  }
})
