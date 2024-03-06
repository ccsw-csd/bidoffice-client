import { BaseClass } from "./BaseClass";
import { Person } from "./Person";

export class OfferItemList{
  id: number;
  client: string;
  name: string;
  sector: BaseClass;
  requestedDate: Date;
  opportunityType: BaseClass = new BaseClass();
  opportunityStatus: BaseClass = new BaseClass();
  deliveryDate: Date;
  managedBy: Person;
  genAi: boolean;
  opportunityWin: boolean;
  
  public constructor(init?:Partial<OfferItemList>) {
    Object.assign(this, init);
  }
}