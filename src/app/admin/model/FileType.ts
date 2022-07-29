export class FileType {
    id: number;
    name: string;
    priority: number;
    
    public constructor(init?:Partial<FileType>) {
        Object.assign(this, init);
      }
}