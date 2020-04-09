import home from './pages/home'
import servers from './pages/servers'
import notifications from './pages/notifications'
import help from './pages/help'
import tables from './forms/tables'
import dialogs from './forms/dialogs'

export default {
  locale: 'en',
  messages: {
    en: {
      app_title: 'MapTracker',
      header: {
        links: {
          login: 'Log in/Register',
          logout: 'Log out',
          openApp: 'Go to app'
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
      home,
      servers,
      notifications,
      help,
      dialog: dialogs,
      table: tables
    }
  }
}
