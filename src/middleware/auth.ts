import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ app, store }) => {
  if (app.$fire.auth) {
  // If user is logged in, store.state.authUser will be filled.
  // INFO -> Firebase Services can be accessed with app.$fire.auth (etc.) in Middleware.
  }
}

export default authMiddleware;
