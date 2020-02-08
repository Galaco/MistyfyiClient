import levelsRepository from '~/plugins/Repository/levels'
import serverRepository from '~/plugins/Repository/server'
import serversRepository from '~/plugins/Repository/servers'
import userRepository from '~/plugins/Repository/user'

export default (ctx: any, inject: any) => {
  const repositories = {
    levels: levelsRepository(ctx.$axios, ctx.$auth),
    server: serverRepository(ctx.$axios, ctx.$auth),
    servers: serversRepository(ctx.$axios, ctx.$auth),
    user: userRepository(ctx.$axios, ctx.$auth)
  }

  inject('repositories', repositories)
}
