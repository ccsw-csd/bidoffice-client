export class Sector {
    id: number;
    name: String;
    priority: number;
    startDate: Date;
    endDate: Date;

    public constructor(init?:Partial<Sector>) {
        Object.assign(this, init);
    }
}