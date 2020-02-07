import { getAccessToken } from '../../plugins/auth0'
import { service, BASE_URL } from './index'

const getWatchedLevels = () => {
  const url = `${BASE_URL}/api/v1/levels/list`
  return service.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } })
}

const addWatchedLevel = (name: string, server: number) => {
  const url = `${BASE_URL}/api/v1/levels/add`
  const data = {
    name,
    server_id: server
  }
  return service.put(url, data, { headers: { Authorization: `Bearer ${getAccessToken()}` } })
}

const deleteWatchedLevel = (name: string) => {
  const url = `${BASE_URL}/api/v1/levels/remove`
  return service.delete(url,
    {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      data: {
        name
      }
    })
}

export {
  getWatchedLevels,
  addWatchedLevel,
  deleteWatchedLevel
}
