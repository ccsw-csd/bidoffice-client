import { BaseClass } from "./BaseClass";

export class OfferDataProject{
  id: number;
  projectType: BaseClass = new BaseClass();
  amount: number;
  ftes: number;
  months: number;
  contributionMargin: number;
}