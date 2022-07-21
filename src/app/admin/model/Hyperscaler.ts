
export class Hyperscaler{
    id: number;
    name: string;
    priority: number;

    public constructor(init?:Partial<Hyperscaler>) {
        Object.assign(this, init);
      }
}

