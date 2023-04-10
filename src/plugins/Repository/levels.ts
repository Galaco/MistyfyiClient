import { AxiosInstance } from "axios"
import { BASE_URL } from "./index"

export interface Levels {
  getWatchedLevels(): Promise<any>
  addWatchedLevel(name: string, server: number|null): Promise<any>
  deleteWatchedLevel(id: number|null): Promise<any>
}

export default ($axios: AxiosInstance) => ({
  getWatchedLevels() {
    return $axios.get(`${BASE_URL}/v1/levels/list`)
  },
  addWatchedLevel(name: string, server: number|null) {
    return $axios.put(`${BASE_URL}/v1/levels/add`, {
      name,
      serverId: server,
    })
  },
  deleteWatchedLevel(id: number|null) {
    return $axios.delete(`${BASE_URL}/v1/levels/remove`, {
      data: {
        id,
      },
    })
  },
})
