import { AxiosInstance } from "axios"
import { BASE_URL } from "./index"

export interface MapName {
  disableMapName(name: string, isDisabled: boolean): Promise<any>
}

export default ($axios: AxiosInstance) => ({
  disableMapName(id: string, isDisabled: boolean) {
    return $axios.post(`${BASE_URL}/api/v1/map/disable/${isDisabled}`, {
      id,
    })
  },
})
