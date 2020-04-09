export default class HistoryItem {
    public mapName: string = '';

    public dateCreated: number = 0;

    constructor (mapName: string, dateCreated: number) {
      this.mapName = mapName
      this.dateCreated = dateCreated
    }
}
