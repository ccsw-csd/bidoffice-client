export class ProjectType {
  id: number;
  name: string;
  priority: number;

  public constructor(init?:Partial<ProjectType>) {
    Object.assign(this, init);
  }
}
