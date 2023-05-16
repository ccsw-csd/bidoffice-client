import { BaseClass } from "./BaseClass";
import { Person } from "./Person";

export class OfferSearch{
    status: BaseClass;
    type: BaseClass;
    sector: BaseClass;
    requestedBy: Person;
    managedBy: Person;
    involved: Person;
    startDateModification: Date;
    endDateModification: Date;
    client: String;
    deliveryDate: Date;
}