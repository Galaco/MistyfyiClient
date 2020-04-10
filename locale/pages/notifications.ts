export default {
  title: 'Watched Maps',
  instructions: {
    free: 'As a free user, you may register for notifications for up to 5 specific map names. By upgrading your limit is increased to 50. Wildcard (*) names are also supported, e.g. \'de_dust*\' will match \'de_dust\' and \'de_dust2\'',
    paid: 'As a paid user, you may register for notifications for up to 50 map names. Wildcard (*) names are also supported, e.g. \'de_dust*\' will match \'de_dust\' and \'de_dust2\''
  },
  buttons: {
    add: 'Add Map',
    delete: 'Delete'
  },
  noItems: {
    add: 'Add first map name',
    title: 'You have not added any map names yet.',
    description: 'Once you add map names, you can start receiving notifications when your favourite servers play them.'
  },
  table: {
    headers: {
      name: 'Map Name',
      server: 'Server',
      enabled: 'Enabled'
    },
    body: {
      servers: {
        all: 'All Servers'
      }
    }
  },
  dialogs: {
    add: {
      title: 'Add Map Name',
      description: {
        paid: 'As a paid user, you can use wildcards (*) to match any map revision. (e.g. ze_illya_* will match all revisions of ze_illya).',
        free: 'As a free user, you will receive notifications if the map names you add match exactly with your watched server.'
      },
      form: {
        name: 'Map name:',
        namePlaceholder: 'Map name',
        server: 'All Servers',
        serverHelper: 'Select a specific server to watch this map name for, or leave blank for all servers',
        nameHelperFree: 'Enter the full name of a map (e.g. de_dust2, or ze_illya_b4)',
        nameHelperPaid: 'Enter the full name of a map, or end with a wildcard (e.g. ze_illya_b4, or ze_illya_*)',
        nameError: 'Field may contain 0-9,a-z,A-Z,-,_ and * only.'
      }
    },
    delete: {
      title: 'Delete Map Name',
      body: 'Are you sure you want to delete this watched map? This action cannot be undone.'
    }
  },
  toast: {
    add: {
      success: 'Now watching map: {name}'
    },
    enable: {
      success: 'Enabled watched map: {name}'
    },
    disable: {
      success: 'Disabled watched map: {name}'
    },
    delete: {
      success: 'Deleted watched map: {name}'
    }
  }
}
