import { AxiosInstance } from 'axios'
import { BASE_URL } from './index'

export default ($axios: AxiosInstance) => ({
  disableMapName (name: string, isDisabled: boolean) {
    return $axios.post(`${BASE_URL}/api/v1/map/disable/${isDisabled}`, {
      name
    })
  }
})
