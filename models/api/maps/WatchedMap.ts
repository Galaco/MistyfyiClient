export default class WatchedMap {
    public name: string = '';

    public serverId: number = -1;

    public disabled: boolean = false;

    constructor (name: string, serverId: number = -1, disabled: boolean = false) {
      this.name = name
      this.serverId = serverId
      this.disabled = disabled
    }
}
