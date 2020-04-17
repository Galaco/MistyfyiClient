export default {
  title: 'Watched Servers',
  instructions: {
    free: 'As a free user, you may watch up to 3 servers. By upgrading, you may watch up to 20 servers.',
    paid: 'As a paid user, you may watch up to 20 servers. Increased limits are available upon request.'
  },
  buttons: {
    add: 'Add server',
    history: 'History',
    delete: 'Delete',
    tableView: 'Table View'
  },
  list: {
    headers: {
      server: 'Server Name',
      address: 'Address',
      map: 'Current Map',
      game: 'Game',
      players: 'Players',
      updated: 'Changed Map'
    }
  },
  server: {
    name: {
      tooltip: 'Server\'s reported name'
    },
    game: {
      tooltip: 'Server\'s reported game name'
    },
    players: {
      tooltip: 'Active players when this server changed map (current player count may differ)'
    },
    updated: {
      tooltip: 'Time elapsed since the current map started',
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
      success: 'Deleted server: {name}'
    }
  }
}
