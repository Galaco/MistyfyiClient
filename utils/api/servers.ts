import { getAccessToken } from '../../plugins/auth0'
import { service, BASE_URL } from './index'

const getServerStatuses = () => {
  const url = `${BASE_URL}/api/v1/servers/list`
  return service.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` } })
}

const addNewServer = (ip: string, port: number) => {
  const url = `${BASE_URL}/api/v1/servers/add`
  const data = {
    ip,
    port
  }
  return service.put(url, data, { headers: { Authorization: `Bearer ${getAccessToken()}` } })
}

const deleteServer = (ip: string, port: number) => {
  const url = `${BASE_URL}/api/v1/servers/remove`
  return service.delete(url,
    {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      data: {
        ip,
        port
      }
    })
}

export {
  getServerStatuses,
  addNewServer,
  deleteServer
}
