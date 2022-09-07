import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { OfferItemList } from 'src/app/offer/model/OfferItemList';
import { OfferService } from 'src/app/offer/services/offer.service';
import { Offer } from 'src/app/offer/model/Offer';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferChangeStatus } from 'src/app/offer/model/OfferChangeStatus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.scss'],
})
export class StatusChangeComponent implements OnInit {
  offerItemList: OfferItemList;
  offerStatus: BaseClass[];
  optionStatus: BaseClass[] = [];
  selectedOptionStatus: BaseClass;
  readonly labelInProgress: string = 'En curso';
  readonly labelInGoNoGo: string = 'Pendiente Go/NoGo';
  readonly labelInReject: string = 'Desestimada';
  readonly labelInStandBy: string = 'Stand by';
  readonly labelInDelivered: string = 'Entregada';
  readonly labelInFinish: string = 'Finalizada';
  offer: Offer = new Offer();
  isLoading: boolean = false;
  newChangeStatus: OfferChangeStatus;
  statusForm: FormGroup;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private offerService: OfferService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.offerItemList = this.config.data;
    this.getDataOffer();

    this.statusForm = this.formBuilder.group({
      progressComment: ['', Validators.required],
      progressDate: ['', Validators.required],
      goNoGoComment: ['', Validators.required],
      goNoGoDate: ['', Validators.required],
      rejectComment: ['', Validators.required],
      standByComment: ['', Validators.required],
      deliveredOption: ['', Validators.required]
    })
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
        this.selectedOptionsStatusValues();
        this.isLoading = false;
      }
    );
  }
  selectedOptionsStatusValues() {
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

  onSave() {
    if(this.selectedOptionStatus != null){
      this.offer.opportunityStatus = this.selectedOptionStatus;
      this.setChangeStatusData();
    }
    else
      this.ref.close();
  }

  onClose() {
    this.ref.close();
  }

  isEqual(selectedStatus: string, optionStatus): boolean{
    return selectedStatus == optionStatus;
  }

  setChangeStatusData(){
    //this.newChangeStatus.username = this.auth.getUsername();
    //this.newChangeStatus.date = new Date();
    //this.newChangeStatus.opportunityStatus = this.selectedOptionStatus;
    //this.offer.changeStatus.push(this.newChangeStatus);
  }
}
