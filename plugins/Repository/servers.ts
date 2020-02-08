import createRepository, { BASE_URL } from './index'

export default ($axios: any, $auth: any) => () => ({
  getServerStatuses () {
    return createRepository($axios, $auth).get(`${BASE_URL}/api/v1/servers/list`)
  },
  addNewServer (ip: string, port: number) {
    return createRepository($axios, $auth).put(`${BASE_URL}/api/v1/servers/add`, {
      ip,
      port
    })
  },
  deleteServer (ip: string, port: number) {
    return createRepository($axios, $auth).delete(`${BASE_URL}/api/v1/servers/remove`, {
      ip,
      port
    })
  }
})
