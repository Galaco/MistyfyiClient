export default class Server {
    public id: string = '';

    public ipAddress: string = '';

    public port: number = 0;

    public name: string = '';

    public currentMap: string = '';

    public game: string = '';

    public playerCount: number = 0;

    public maxPlayers: number = 0;

    public lastUpdated: number = 0;

    constructor (id: string, ipAddress: string, port: number = 0, name: string = '', currentMap: string = '', game: string = '', playerCount: number = 0, maxPlayers: number = 0, lastUpdated: number = 0) {
      this.id = id
      this.ipAddress = ipAddress
      this.port = port
      this.name = name
      this.currentMap = currentMap
      this.game = game
      this.playerCount = playerCount
      this.maxPlayers = maxPlayers
      this.lastUpdated = lastUpdated
    }
}
