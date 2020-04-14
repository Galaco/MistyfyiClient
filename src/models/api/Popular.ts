import Server from './servers/Server'
import WatchedMap from './maps/WatchedMap'
import HistoryItem from './servers/Historyitem'

export default class Popular {
    public servers: Server[] = [];

    public maps: HistoryItem[] = [];

    public watchedMaps: WatchedMap[] = []

    constructor (servers: Server[] = [], maps: HistoryItem[] = [], watchedMaps: WatchedMap[] = []) {
      this.servers = servers
      this.maps = maps
      this.watchedMaps = watchedMaps
    }
}
