export class Methodology{
  id: number;
  name: string;
  priority: number;

  public constructor(init?:Partial<Methodology>) {
    Object.assign(this, init);
  }
}