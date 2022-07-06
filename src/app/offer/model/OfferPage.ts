import { Pageable } from "src/app/core/models/Pageable";
import { OfferItemList } from "./OfferItemList";

export class OfferPage{
  content: OfferItemList[];
  pageable: Pageable;
  totalElements: number;
}