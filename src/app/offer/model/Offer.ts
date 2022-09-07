import { BaseClass } from "./BaseClass";
import { OfferChangeStatus } from "./OfferChangeStatus";
import { OfferDataChapter } from "./OfferDataChapter";
import { OfferDataFile } from "./OfferDataFile";
import { OfferDataProject } from "./OfferDataProject";
import { OfferDataTeam } from "./OfferDataTeam";
import { OfferDataTechnology } from "./OfferDataTechnology";
import { OfferOffering } from "./OfferOffering";
import { OfferTeamPerson } from "./OfferTeamPerson";
import { OfferTechnology } from "./OfferTechnology";
import { OfferTracing } from "./OfferTracing";
import { Person } from "./Person";

export class Offer{
  id: number;
  client: string;
  name: string;
  requestedBy: Person;
  requestedDate: Date;
  managedBy: Person;
  bdcCode: string;
  sector: BaseClass = new BaseClass();
  goNogoDate: Date;
  deliveryDate: Date;
  opportunityType: BaseClass = new BaseClass();;
  opportunityStatus: BaseClass = new BaseClass();;
  opportunityWin: boolean;
  observations: string;
  dataChapter: OfferDataChapter = new OfferDataChapter();
  dataFiles: OfferDataFile[] = new Array();
  dataProject: OfferDataProject = new OfferDataProject();
  dataTeam: OfferDataTeam = new OfferDataTeam();
  dataTechnology: OfferDataTechnology = new OfferDataTechnology();
  offerings: OfferOffering[] = new Array();
  teamPerson: OfferTeamPerson[] = new Array();
  technologies: OfferTechnology[] = new Array();
  tracings: OfferTracing[] = new Array();
  changeStatus: OfferChangeStatus[] = new Array();
}