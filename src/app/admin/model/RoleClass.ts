export class RoleClass{
  id: number;
  name: string;

  public constructor(init?:Partial<RoleClass>) {
    Object.assign(this, init);
  }
}
