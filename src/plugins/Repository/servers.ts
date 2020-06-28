import { AxiosInstance } from "axios"
import ApiResponse from "./ApiResponse"
import { BASE_URL } from "./index"

export interface Servers {
  getServerStatuses(): Promise<ApiResponse>
  addNewServer(ip: string, port: number): Promise<ApiResponse>
  deleteServer(ip: string, port: number): Promise<ApiResponse>
}

export default (axios: AxiosInstance) => ({
  getServerStatuses(): Promise<ApiResponse> {
    return axios.get(`${BASE_URL}/api/v1/servers/list`)
  },
  addNewServer(ip: string, port: number): Promise<ApiResponse> {
    return axios.put(`${BASE_URL}/api/v1/servers/add`, {
      ip,
      port,
    })
  },
  deleteServer(ip: string, port: number): Promise<ApiResponse> {
    return axios.delete(`${BASE_URL}/api/v1/servers/remove`, {
      data: {
        ip,
        port,
      },
    })
  },
})
