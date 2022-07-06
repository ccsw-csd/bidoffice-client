import { BaseClass } from "./BaseClass";

export class OfferItemList{
  id: number;
  client: string;
  name: string;
  sector: BaseClass;
  requestDate: Date;
  opportunityType: BaseClass;
  opportunityStatus: BaseClass;

  public constructor(init?:Partial<OfferItemList>) {
    Object.assign(this, init);
  }
}