import feed from './pages/feed'
import servers from './pages/servers'
import notifications from './pages/notifications'
import help from './pages/help'
import tables from './forms/tables'
import dialogs from './forms/dialogs'

export default {
  locale: 'en',
  messages: {
    en: {
      app_title: 'Ikamu',
      header: {
        links: {
          logout: 'Log out',
        },
        profile: {
          expiresAt: 'Expires: '
        }
      },
      footer: {
        description: ' is a dedicated game server map rotation tracker.',
        owner: 'A project by '
      },
      navigation: {
        links: {
          feed: 'Home',
          servers: 'Servers',
          notifications: 'Map Notifications',
          help: 'Help'
        }
      },
      account: {
        types: {
          free: 'Free User',
          paid: 'Premium User'
        }
      },
      feed,
      servers,
      notifications,
      help,
      dialog: dialogs,
      table: tables
    }
  }
}
