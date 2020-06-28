import { AxiosInstance } from "axios"
import { BASE_URL } from "./index"

export interface Levels {
  getWatchedLevels(): Promise<any>
  addWatchedLevel(name: string, server: number): Promise<any>
  deleteWatchedLevel(id: string): Promise<any>
}

export default ($axios: AxiosInstance) => ({
  getWatchedLevels() {
    return $axios.get(`${BASE_URL}/api/v1/levels/list`)
  },
  addWatchedLevel(name: string, server: number) {
    return $axios.put(`${BASE_URL}/api/v1/levels/add`, {
      name,
      serverId: server,
    })
  },
  deleteWatchedLevel(id: string) {
    return $axios.delete(`${BASE_URL}/api/v1/levels/remove`, {
      data: {
        id,
      },
    })
  },
})
