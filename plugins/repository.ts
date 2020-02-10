import createRepository from '~/plugins/Repository/index'
import levelsRepository from '~/plugins/Repository/levels'
import serverRepository from '~/plugins/Repository/server'
import serversRepository from '~/plugins/Repository/servers'
import userRepository from '~/plugins/Repository/user'
import { normalizeResponse } from '~/plugins/Repository/transform'

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
    server: serverRepository(createRepository(ctx.$axios)),
    servers: serversRepository(ctx.$axios),
    user: userRepository(createRepository(ctx.$axios))
  }

  inject('repositories', repositories)
}
