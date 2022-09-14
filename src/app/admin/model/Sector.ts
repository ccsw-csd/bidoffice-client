export class Sector {
    id: number;
    name: String;
    priority: number;
    startDate: Date;
    endDate: Date;
    active: boolean;

    public constructor(init?:Partial<Sector>) {
        Object.assign(this, init);

        if (this.startDate != null) { 

            this.startDate = new Date(this.startDate.toLocaleString());
        }

        if (this.endDate != null) {

            this.endDate = new Date(this.endDate.toLocaleString());
        }  
    }
}