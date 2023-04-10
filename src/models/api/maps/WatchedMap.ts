export default class WatchedMap {
  public id: string = ""

  public name: string = ""

  public serverId: number|null = null

  public disabled: boolean = false

  constructor(
    id: string,
    name: string,
    serverId: number|null = null,
    disabled: boolean = false
  ) {
    this.id = id
    this.name = name
    this.serverId = serverId
    this.disabled = disabled
  }
}
