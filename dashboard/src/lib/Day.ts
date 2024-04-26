export default class Day {
    public isWorking: boolean = false;
    public from: string       = '00:00';
    public to: string         = '23:30'


    public static fromJSON(json: Day) {
        const day = new Day();

        day.isWorking = json.isWorking ?? false;
        day.from      = json.from ?? '00:00';
        day.to        = json.to ?? '23:30';

        return day;
    }

    public toJSON() {
        return {
            isWorking: this.isWorking,
            from     : this.from,
            to       : this.to
        }
    }
}