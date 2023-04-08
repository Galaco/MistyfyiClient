import { AxiosInstance } from "axios"
import { BASE_URL } from "./index"

export interface Feed {
  getFeedLatest(): Promise<any>
}

export default (axios: AxiosInstance) => ({
  getFeedLatest() {
    return axios.get(`${BASE_URL}/v1/feed/latest`)
  },
})
