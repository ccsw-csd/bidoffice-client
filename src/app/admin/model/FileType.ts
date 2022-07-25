export class FileType {
    id: number;
    nombre: string;
    prioridad: number;
    
    public constructor(init?:Partial<FileType>) {
        Object.assign(this, init);
      }
}