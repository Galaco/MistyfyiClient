import createRepository, { BASE_URL } from './index'

export default ($axios: any, $auth: any) => () => ({
  getWatchedLevels () {
    return createRepository($axios, $auth).get(`${BASE_URL}/api/v1/levels/list`)
  },
  addWatchedLevel (name: string, server: number) {
    return createRepository($axios, $auth).put(`${BASE_URL}/api/v1/levels/add`, {
      name,
      server_id: server
    })
  },
  deleteWatchedLevel (name: string) {
    return createRepository($axios, $auth).delete(`${BASE_URL}/api/v1/levels/remove`, {
      data: {
        name
      }
    })
  }
})
