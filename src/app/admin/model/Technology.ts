export class Technology {
    id: number;
    name: String;
    priority: number;

    public constructor(init?:Partial<Technology>) {
        Object.assign(this, init);
    }
}