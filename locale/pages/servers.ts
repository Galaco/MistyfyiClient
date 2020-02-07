export default {
  servers: {
    title: 'Watched Servers',
    instructions: {
      free: 'As a free user, you may watch up to 3 servers. You may also watch for up to 5 map names.',
      paid: 'As a paid user, you may watch up to 20 servers. You may also watch for up to 50 map names. Wildcard (*) names are also supported, e.g. \'de_dust*\''
    },
    buttons: {
      add: 'Add server',
      history: 'History',
      delete: 'Delete'
    },
    list: {
      headers: {
        server: 'Server',
        address: 'Address',
        map: 'Current Map',
        updated: 'Updated'
      }
    },
    server: {
      updated: {
        prefix: 'Updated ',
        notResponding: 'Could not contact server'
      }
    },
    noItems: {
      add: 'Add first server',
      title: 'You have not added any servers yet.',
      // tslint:disable-next-line:max-line-length
      description: 'Once you add your favourite servers, you can view what they are playing here.'
    },
    dialogs: {
      add: {
        title: 'Add Server',
        form: {
          ip: 'Server IP Address:',
          ipHelper: 'Add a valid server IP address',
          ipPlaceholder: 'Server ip (e.g. 127.0.0.1)',
          ipError: 'Field must be a valid IP address.',
          port: 'Server port (default: 0):',
          portHelper: 'Specify the port to connect to (some games do not require this)',
          portPlaceholder: 'Server port (e.g. 27015)',
          portError: 'Port must be between 0-65536.'
        }
      },
      delete: {
        title: 'Delete Server',
        body: 'Are you sure you want to delete this server? This action cannot be undone.'
      },
      history: {
        title: 'Server History',
        body: {
          headers: {
            date: 'Changed',
            mapName: 'Map Name'
          }
        }
      }
    },
    toast: {
      add: {
        success: 'Now watching server: {ip}:{port}'
      },
      delete: {
        success: 'Successfully deleted server: {name}'
      }
    }
  },
  mapNames: {
    title: 'Watched Maps',
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
        server: 'Server'
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
        success: 'Now watching for map: {name}'
      },
      delete: {
        success: 'Successfully deleted watch name: {name}'
      }
    }
  }
}
