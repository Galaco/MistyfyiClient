import { getAccessToken } from '../../plugins/auth0'
import { service, BASE_URL } from './index'

const getServerHistory = (id: number) => {
  const url = `${BASE_URL}/api/v1/server/history/${id}`
  return service.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } })
}

export {
  getServerHistory
}
