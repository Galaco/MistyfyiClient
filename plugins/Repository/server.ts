import createRepository, { BASE_URL } from './index'

export default ($axios: any, $auth: any) => () => ({
  getServerHistory (id: number) {
    return createRepository($axios, $auth).get(`${BASE_URL}/api/v1/server/history/${id}`)
  }
})
