import createRepository, { normalizeResponse } from './Repository/index'
import levelsRepository from './Repository/levels'
import mapNameRepository from './Repository/mapName'
import serverRepository from './Repository/server'
import serversRepository from './Repository/servers'
import userRepository from './Repository/user'

export default (ctx: any, inject: any) => {
  const success = (data: any): any => {
    return Promise.resolve(normalizeResponse(data))
  }
  const failure = (data: any): any => {
    return Promise.reject(normalizeResponse(data))
  }

  ctx.$axios.interceptors.response.use(success, failure)
  ctx.$axios.setToken(ctx.$auth.getToken('auth0'))

  const repositories = {
    levels: levelsRepository(createRepository(ctx.$axios)),
    mapName: mapNameRepository(createRepository(ctx.$axios)),
    server: serverRepository(createRepository(ctx.$axios)),
    servers: serversRepository(ctx.$axios),
    user: userRepository(createRepository(ctx.$axios))
  }

  inject('repositories', repositories)
}
