export default class Server {
    public id: string = '';

    // eslint-disable-next-line
    public ip_address: string = '';

    public port: number = 0;

    public name: string = '';

    // eslint-disable-next-line
    public current_map: string = '';

    // eslint-disable-next-line
    public last_updated: number = 0;

    constructor (id: string, ipAddress: string, port: number = 0, name: string = '', currentMap: string = '', lastUpdated: number = 0) {
      this.id = id
      this.ip_address = ipAddress
      this.port = port
      this.name = name
      this.current_map = currentMap
      this.last_updated = lastUpdated
    }
}
