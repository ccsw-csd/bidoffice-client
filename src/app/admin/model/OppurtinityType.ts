export class OpportunityType{
    id: number;
    name: string;
    priority: number;
    public constructor(init?:Partial<OpportunityType>) {
        Object.assign(this, init);
      }
}