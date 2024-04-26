import Day from "@/lib/Day";

export default class Week {
    public saturday  = new Day();
    public sunday    = new Day();
    public monday    = new Day();
    public tuesday   = new Day();
    public wednesday = new Day();
    public thursday  = new Day();
    public friday    = new Day();

    public static fromJSON(json: string) {
        const week      = new Week();
        let object: any = {};

        try {
            object = JSON.parse(json);
        } catch {
        }
        week.saturday  = Day.fromJSON(object.saturday) ?? new Day();
        week.sunday    = Day.fromJSON(object.sunday) ?? new Day();
        week.monday    = Day.fromJSON(object.monday) ?? new Day();
        week.tuesday   = Day.fromJSON(object.tuesday) ?? new Day();
        week.wednesday = Day.fromJSON(object.wednesday) ?? new Day();
        week.thursday  = Day.fromJSON(object.thursday) ?? new Day();
        week.friday    = Day.fromJSON(object.friday) ?? new Day();

        return week;
    }

    public toJSON() {
        return {
            saturday : this.saturday.toJSON(),
            sunday   : this.sunday.toJSON(),
            monday   : this.monday.toJSON(),
            tuesday  : this.tuesday.toJSON(),
            wednesday: this.wednesday.toJSON(),
            thursday : this.thursday.toJSON(),
            friday   : this.friday.toJSON(),
        }
    }
}