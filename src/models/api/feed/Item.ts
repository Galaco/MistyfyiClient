export default class Item {
  public serverIP: string = ""

  public serverPort: number = -1

  public serverName: string = ""

  public mapName: string = ""

  public lastUpdated: number = 0

  constructor(
    serverIP: string,
    serverPort: number = -1,
    serverName: string,
    mapName: string,
    lastUpdated: number
  ) {
    this.serverIP = serverIP
    this.serverPort = serverPort
    this.serverName = serverName
    this.mapName = mapName
    this.lastUpdated = lastUpdated
  }
}
