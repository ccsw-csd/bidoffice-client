export class Offering{
    id: number;
    name: string;
    priority: number;
  
    public constructor(init?:Partial<Offering>) {
      Object.assign(this, init);
    }
  }