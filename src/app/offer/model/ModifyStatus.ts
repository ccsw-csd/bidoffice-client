import { BaseClass } from "./BaseClass";
import { OfferChangeStatus } from "./OfferChangeStatus";
import { OfferTracing } from "./OfferTracing";

export class ModifyStatus{
    id: number;
    goNogoDate: Date;
    deliveryDate: Date;
    changeStatus: OfferChangeStatus = new OfferChangeStatus();
    tracing: OfferTracing = new OfferTracing();
    opportunityStatus: BaseClass = new BaseClass();
    win: boolean;
}