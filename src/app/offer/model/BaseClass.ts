export class BaseClass{
  id: number;
  name: string;
  priority: number;

  public constructor(init?:Partial<BaseClass>) {
    Object.assign(this, init);
  }
}