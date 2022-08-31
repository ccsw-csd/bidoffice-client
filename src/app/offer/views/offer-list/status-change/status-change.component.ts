import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { OfferItemList } from 'src/app/offer/model/OfferItemList';
import { OfferService } from 'src/app/offer/services/offer.service';
import { Offer } from 'src/app/offer/model/Offer';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.scss'],
})
export class StatusChangeComponent implements OnInit {
  offerItemList: OfferItemList;
  offerStatus: BaseClass[];
  optionStatus: BaseClass[] = [];
  readonly labelInProgress: string = 'En curso';
  readonly labelInGoNoGo: string = 'Pendiente Go/NoGo';
  readonly labelInReject: string = 'Desestimada';
  readonly labelInStandBy: string = 'Stand by';
  readonly labelInDelivered: string = 'Entregada';
  readonly labelInFinish: string = 'Finalizada';
  offer: Offer = new Offer();
  isLoading: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.offerItemList = this.config.data;
    this.getDataOffer();
  }

  getDataOffer(){
    this.isLoading = true;
    forkJoin({
      requestOffer: this.offerService.getOffer(this.offerItemList.id),
      requestOfferStatus: this.offerService.getAllOfferStatus(),
    }).subscribe(
      ({
        requestOffer,
        requestOfferStatus,
      }) => {
        this.offer = requestOffer;
        this.offerStatus = requestOfferStatus;
        this.selectedOptionsStatus();
        this.isLoading = false;
      }
    );
  }
  selectedOptionsStatus() {
    this.optionStatus = this.offerStatus.filter((item) =>
      this.filterOptionStatus(item.name)
    );

    if(this.optionStatus.length == 0)
      this.onClose();
  }

  filterOptionStatus(status: string): boolean {
    if (this.offerItemList.opportunityStatus.name == this.labelInProgress)
      return (
        status == this.labelInReject ||
        status == this.labelInStandBy ||
        status == this.labelInDelivered
      );

    if (this.offerItemList.opportunityStatus.name == this.labelInGoNoGo)
      return status == this.labelInReject || status == this.labelInProgress;

    if (
      this.offerItemList.opportunityStatus.name == this.labelInReject ||
      this.offerItemList.opportunityStatus.name == this.labelInStandBy
    )
      return status == this.labelInGoNoGo || status == this.labelInProgress;

    if(this.offerItemList.opportunityStatus.name == this.labelInDelivered)
      return status == this.labelInFinish;

    return false;
  }

  isGoNoGo(): boolean{
    return this.offerItemList.opportunityStatus.name == this.labelInGoNoGo;
  }

  onSave() {}

  onClose() {
    this.ref.close();
  }
}
