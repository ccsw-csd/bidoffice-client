export class FormatDocument {
    id: number;
    name: string;
    priority: number;
    
    public constructor(init?:Partial<FormatDocument>) {
        Object.assign(this, init);
    }
}