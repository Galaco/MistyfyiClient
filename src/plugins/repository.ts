import {Axios, AxiosInstance, AxiosResponse} from "axios"
import createRepository, { normalizeResponse } from "./Repository/index"
import feedRepository, { Feed } from "./Repository/feed"
import levelsRepository, { Levels } from "./Repository/levels"
import mapNameRepository, { MapName } from "./Repository/mapName"
import popularRepository, { Popular } from "./Repository/popular"
import serverRepository, { Server } from "./Repository/server"
import serversRepository, { Servers } from "./Repository/servers"
import userRepository, { User } from "./Repository/user"
import ApiResponse from "./Repository/ApiResponse"
import Vue from "vue";
import {PluginObject} from "vue/types/plugin";
import {NuxtAxiosInstance} from "@nuxtjs/axios";

class Repository {
  axios: NuxtAxiosInstance
  feed: Feed
  levels: Levels
  mapName: MapName
  popular: Popular
  server: Server
  servers: Servers
  user: User

  constructor(
    axios: NuxtAxiosInstance,
    feed: Feed,
    levels: Levels,
    mapName: MapName,
    popular: Popular,
    server: Server,
    servers: Servers,
    user: User
  ) {
    this.axios = axios
    this.feed = feed
    this.levels = levels
    this.mapName = mapName
    this.popular = popular
    this.server = server
    this.servers = servers
    this.user = user
  }

  setBearerToken(token: string) {
    this.axios.setToken(token)
  }
}

export default async (ctx: any, inject: any) => {
  const success = (data: AxiosResponse): Promise<ApiResponse> => {
    return Promise.resolve(normalizeResponse(data))
  }
  const failure = (data: AxiosResponse): Promise<ApiResponse> => {
    return Promise.reject(normalizeResponse(data))
  }

  ctx.$axios.interceptors.response.use(success, failure)

  if (ctx.$fire.auth.currentUser) {
    const token = await ctx.$fire.auth.currentUser.getIdToken(false);
    ctx.$axios.setToken(token);
  }

  const plugin = new Repository(
    ctx.$axios,
    feedRepository(createRepository(ctx.$axios)),
    levelsRepository(createRepository(ctx.$axios)),
    mapNameRepository(createRepository(ctx.$axios)),
    popularRepository(createRepository(ctx.$axios)),
    serverRepository(createRepository(ctx.$axios)),
    serversRepository(ctx.$axios),
    userRepository(createRepository(ctx.$axios))
  )
  // const P: PluginObject<Repository> = {
  //   install: (vue: any) => {
  //     vue.prototype.$repositories = plugin
  //   },
  // }

  inject("repositories", plugin)
}

declare module "vue/types/vue" {
  interface Vue {
    $repositories: Repository
  }
}
