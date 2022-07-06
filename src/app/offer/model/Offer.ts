import { BaseClass } from "./BaseClass";
import { Person } from "./Person";

export class Offer{
  id: number;
  client: string;
  name: string;
  requestedBy: Person;
  requestedDate: Date;
  managedBy: Person;
  bdcCode: string;
  sector: BaseClass;
  goNogoDate: Date;
  deliveryDate: Date;
  opportunityType: BaseClass;
  opportunityStatus: BaseClass;
  opportunityWin: boolean;
  observations: string;
}