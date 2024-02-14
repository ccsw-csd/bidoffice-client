export class OfferDataExportList{
  id: number;
  client: string;
  name: string;
  observations: string;
  sector: string;
  deliveryDate: Date;
  requestedDate: Date;
  requestedBy: string;
  opportunityType: string;
  modernization: string;
  endToEnd: string;
  devops: string;
  rpa: string;
  projectOffice: string;
  lowcode: string;
  integrations: string;
  services: string;
  migration: string;
  softwareHouses: string;
  architecture: string;
  principalTechnology: string;
  moreTechnology: string;
  cloud: string;
  ia: string;
  agile: string;
  projectType: string;
  amount: number;
  ftes: number;
  months: number;
  rateCard: string;
  presentation: string;
  capabilities: string;
  approach: string;
  methodology: string;
  workModel: string;
  team: string;
  planning: string;
  valueAdded: string;
  innovation: string;
  sostenibility: string;
  refrence: string;
  ccaLeader: string;
  multitower: string;
  practices: string;
  person: string;
  win: string;
  keyDocument: string;
  comercialReference: string;
  comments: string;
  
  public constructor(init?:Partial<OfferDataExportList>) {
    Object.assign(this, init);
  }
}