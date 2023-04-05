import feed from "./pages/feed"
import popular from "./pages/popular"
import servers from "./pages/servers"
import notifications from "./pages/notifications"
import help from "./pages/help"
import tables from "./forms/tables"
import dialogs from "./forms/dialogs"
import home from "./pages/home"

export default {
  locale: "en",
  messages: {
    en: {
      app_title: "Misty.fyi",
      header: {
        links: {
          login: "Sign in",
          signup: "Sign up",
          redirecting: "Redirecting...",
          logout: "Log out",
        },
        profile: {
          expiresAt: "Expires: ",
        },
      },
      footer: {
        description: " is a dedicated game server tracking service",
        owner: "A project by ",
      },
      navigation: {
        links: {
          feed: "My Feed",
          popular: "Popular",
          servers: "Servers",
          notifications: "Map Notifications",
          help: "Help",
        },
      },
      account: {
        types: {
          free: "Free User",
          paid: "Paid User",
        },
      },
      home,
      feed,
      help,
      notifications,
      popular,
      servers,
      dialog: dialogs,
      table: tables,
    },
  },
}
