import createRepository, { normalizeResponse } from './Repository/index'
import feedRepository, { Feed } from './Repository/feed'
import levelsRepository, { Levels } from './Repository/levels'
import mapNameRepository, { MapName } from './Repository/mapName'
import popularRepository, { Popular } from './Repository/popular'
import serverRepository, { Server } from './Repository/server'
import serversRepository, { Servers } from './Repository/servers'
import userRepository, { User } from './Repository/user'

class Repository {
  feed: Feed;
  levels: Levels;
  mapName: MapName;
  popular: Popular;
  server: Server;
  servers: Servers;
  user: User;

  constructor (feed: Feed, levels: Levels, mapName: MapName, popular: Popular, server: Server, servers: Servers, user: User) {
    this.feed = feed
    this.levels = levels
    this.mapName = mapName
    this.popular = popular
    this.server = server
    this.servers = servers
    this.user = user
  }
}

export default (ctx: any, inject: any) => {
  const success = (data: any): any => {
    return Promise.resolve(normalizeResponse(data))
  }
  const failure = (data: any): any => {
    return Promise.reject(normalizeResponse(data))
  }

  ctx.$axios.interceptors.response.use(success, failure)
  ctx.$axios.setToken(ctx.$auth.getToken('auth0'))

  const plugin = new Repository(
    feedRepository(createRepository(ctx.$axios)),
    levelsRepository(createRepository(ctx.$axios)),
    mapNameRepository(createRepository(ctx.$axios)),
    popularRepository(createRepository(ctx.$axios)),
    serverRepository(createRepository(ctx.$axios)),
    serversRepository(ctx.$axios),
    userRepository(createRepository(ctx.$axios))
  )
  inject('repositories', plugin)
}

declare module 'vue/types/vue' {
  interface Vue {
    $repositories: Repository;
  }
}
