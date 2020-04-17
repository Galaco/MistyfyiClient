export default class Server {
    public id: string = '';

    // eslint-disable-next-line
    public ipAddress: string = '';

    public port: number = 0;

    public name: string = '';

    public currentMap: string = '';

    public lastUpdated: number = 0;

    constructor (id: string, ipAddress: string, port: number = 0, name: string = '', currentMap: string = '', lastUpdated: number = 0) {
      this.id = id
      this.ipAddress = ipAddress
      this.port = port
      this.name = name
      this.currentMap = currentMap
      this.lastUpdated = lastUpdated
    }
}
