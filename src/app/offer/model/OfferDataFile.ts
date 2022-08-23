import { BaseClass } from "./BaseClass";

export class OfferDataFile{
  uuid: string
  id: number;
  name: string;
  link: string;
  observations: string
  fileType: BaseClass = new BaseClass();
}