import { AxiosInstance } from "axios"
import { BASE_URL } from "./index"

export interface Server {
  getServerHistory(id: string): Promise<any>
}

export default ($axios: AxiosInstance) => ({
  getServerHistory(id: string) {
    return $axios.get(`${BASE_URL}/v1/server/history/${id}`)
  },
})
