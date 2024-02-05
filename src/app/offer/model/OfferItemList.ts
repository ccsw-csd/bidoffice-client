import { BaseClass } from "./BaseClass";
import { Person } from "./Person";

export class OfferItemList{
  id: number;
  client: string;
  name: string;
  sector: BaseClass;
  requestDate: Date;
  opportunityType: BaseClass = new BaseClass();
  opportunityStatus: BaseClass = new BaseClass();
  deliveryDate: Date;
  managedBy: Person;
  
  public constructor(init?:Partial<OfferItemList>) {
    Object.assign(this, init);
  }
}