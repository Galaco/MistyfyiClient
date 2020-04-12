export default class WatchedMap {
    public name: string = '';

    public serverId: string = '';

    public disabled: boolean = false;

    constructor (name: string, serverId: string = '', disabled: boolean = false) {
      this.name = name
      this.serverId = serverId
      this.disabled = disabled
    }
}
