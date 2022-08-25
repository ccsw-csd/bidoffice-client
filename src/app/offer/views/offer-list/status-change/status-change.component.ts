import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { OfferItemList } from 'src/app/offer/model/OfferItemList';
import { OfferService } from 'src/app/offer/services/offer.service';

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
  readonly labelInStandBy: string = 'Stand By';
  readonly labelInDelivered: string = 'Entregada';
  readonly labelInFinish: string = 'Finalizada';
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.getAllOfferStatus();
    this.offerItemList = this.config.data;
    console.log(this.offerItemList);
  }

  getAllOfferStatus() {
    this.offerService.getAllOfferStatus().subscribe({
      next: (res: BaseClass[]) => {
        this.offerStatus = res;
        this.selectedOptionsStatus();
      },
      error: () => {},
      complete: () => {},
    });
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

  onSave() {}

  onClose() {
    this.ref.close();
  }
}
