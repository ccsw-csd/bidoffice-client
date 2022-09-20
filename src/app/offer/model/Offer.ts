import { BaseClass } from './BaseClass';
import { OfferChangeStatus } from './OfferChangeStatus';
import { OfferDataChapter } from './OfferDataChapter';
import { OfferDataFile } from './OfferDataFile';
import { OfferDataProject } from './OfferDataProject';
import { OfferDataTeam } from './OfferDataTeam';
import { OfferDataTechnology } from './OfferDataTechnology';
import { OfferTracing } from './OfferTracing';
import { Person } from './Person';
export class Offer {
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
  opportunityType: BaseClass = new BaseClass();
  opportunityStatus: BaseClass = new BaseClass();
  opportunityWin: boolean;
  observations: string;
  dataChapter: OfferDataChapter = new OfferDataChapter();
  dataFiles: OfferDataFile[] = new Array();
  dataProject: OfferDataProject = new OfferDataProject();
  dataTeam: OfferDataTeam = new OfferDataTeam();
  dataTechnology: OfferDataTechnology = new OfferDataTechnology();
  offerings: BaseClass[] = new Array();
  teamPerson: Person[] = new Array();
  technologies: BaseClass[] = new Array();
  tracings: OfferTracing[] = new Array();
  changeStatus: OfferChangeStatus[] = new Array();

  parseStringToDate() {
    if (this.goNogoDate != null)
      this.goNogoDate = new Date(this.goNogoDate.toLocaleString());

    if(this.requestedDate != null)
      this.requestedDate = new Date(this.requestedDate.toLocaleString());

    if(this.deliveryDate != null)
      this.deliveryDate = new Date(this.deliveryDate.toLocaleString());

    this.tracings.forEach(item => item.date = new Date(item.date.toLocaleString()))
  }
}
