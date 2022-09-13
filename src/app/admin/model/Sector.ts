export class Sector {
    id: number;
    name: String;
    priority: number;
    startDate: Date;
    endDate: Date;
    active: boolean;

    public constructor(init?:Partial<Sector>) {
        Object.assign(this, init);

        this.startDate = new Date(this.startDate.toLocaleString());
        this.endDate = new Date(this.endDate.toLocaleString());
    }

}