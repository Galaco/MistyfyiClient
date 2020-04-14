import feed from './pages/feed'
import popular from './pages/popular'
import servers from './pages/servers'
import notifications from './pages/notifications'
import help from './pages/help'
import tables from './forms/tables'
import dialogs from './forms/dialogs'

export default {
  locale: 'en',
  messages: {
    en: {
      app_title: 'Ikamu.io',
      header: {
        links: {
          login: 'Login',
          redirecting: 'Redirecting...',
          logout: 'Log out',
        },
        profile: {
          expiresAt: 'Expires: '
        }
      },
      footer: {
        description: ' is a dedicated game server tracking service',
        owner: 'A project by '
      },
      navigation: {
        links: {
          feed: 'Home',
          popular: 'Popular',
          servers: 'Servers',
          notifications: 'Map Notifications',
          help: 'Help'
        }
      },
      account: {
        types: {
          free: 'Free User',
          paid: 'Paid User'
        }
      },
      feed,
      help,
      notifications,
      popular,
      servers,
      dialog: dialogs,
      table: tables
    }
  }
}
