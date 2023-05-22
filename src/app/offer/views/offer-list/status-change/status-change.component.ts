import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { OfferItemList } from 'src/app/offer/model/OfferItemList';
import { OfferService } from 'src/app/offer/services/offer.service';
import { Offer } from 'src/app/offer/model/Offer';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferChangeStatus } from 'src/app/offer/model/OfferChangeStatus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfferTracing } from 'src/app/offer/model/OfferTracing';
import { Person } from 'src/app/offer/model/Person';
import { ModifyStatus } from 'src/app/offer/model/ModifyStatus';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.scss'],
})
export class StatusChangeComponent implements OnInit {
  readonly labelInProgress: string = 'En curso';
  readonly labelInGoNoGo: string = 'Pendiente Go/NoGo';
  readonly labelInReject: string = 'Desestimada';
  readonly labelInStandBy: string = 'Stand by';
  readonly labelInDelivered: string = 'Entregada';
  readonly labelInFinish: string = 'Finalizada';
  offerItemList: OfferItemList;
  offerChangeStatus: OfferChangeStatus[] = [];
  offerStatus: BaseClass[];
  optionStatus: BaseClass[] = [];
  selectedOptionStatus: BaseClass;
  isLoading: boolean = false;
  statusForm: FormGroup;
  person: Person;
  offer: Offer = new Offer();
  newChangeStatus: OfferChangeStatus = new OfferChangeStatus();
  modifyStatus: ModifyStatus = new ModifyStatus();
  modifyStatusClone: ModifyStatus = new ModifyStatus();

  constructor(
    private offerService: OfferService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.offerItemList = this.config.data;
    this.offerService.findByOfferId(this.offerItemList.id).subscribe({
      next: (res: OfferChangeStatus[]) => {
        this.offerChangeStatus = res;
      },
      error: () => { },
      complete: () => {
        this.isLoading = false;
      },
    });
    this.getAllOfferStatus();

    this.statusForm = this.formBuilder.group({
      comment: ['', Validators.required],
      progressDate: ['', Validators.required],
      goNoGoDate: ['', Validators.required],
      deliveredOption: ['', Validators.required],
    });
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  getAllOfferStatus() {
    this.isLoading = true;
    this.offerService.getAllOfferStatus().subscribe({
      next: (res: BaseClass[]) => {
        this.offerStatus = res;
      },
      error: () => { },
      complete: () => {
        this.selectedOptionsStatusValues();
        this.isLoading = false;
      },
    });
  }
  selectedOptionsStatusValues() {
    this.optionStatus = this.offerStatus.filter((item) =>
      this.filterOptionStatus(item.name)
    );

    if (this.optionStatus.length == 0) this.onClose();

    this.selectedOptionStatus = this.optionStatus[0];
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
      this.offerItemList.opportunityStatus.name == this.labelInReject
    )
      return status == this.labelInGoNoGo || status == this.labelInProgress;

    if (this.offerItemList.opportunityStatus.name == this.labelInDelivered)
      return status == this.labelInFinish;

    if (this.offerItemList.opportunityStatus.name == this.labelInStandBy)
      return status == this.labelInProgress || status == this.labelInReject;

    return false;
  }

  onSave() {
    if (this.statusForm.valid) {
      this.setData();
      this.isLoading = true;
      this.offerService.modifyStatus(this.modifyStatus).subscribe({
        next: (res: OfferItemList) => {
          this.offerItemList;
        },
        error: () => { },
        complete: () => {
          this.isLoading = false;
          this.onClose();
        },
      });
    } else {
      Object.keys(this.statusForm.controls).forEach((control) =>
        this.statusForm.controls[control].markAsDirty()
      );
      this.statusForm.markAllAsTouched();
    }
  }

  onClose() {
    this.ref.close();
  }

  isEqual(selectedStatus: string, optionStatus): boolean {
    return selectedStatus == optionStatus;
  }

  private setData() {
    this.modifyStatus.opportunityStatus = this.selectedOptionStatus;
    this.modifyStatus.id = this.offerItemList.id;
    this.setChangeStatus();
    this.setTracing();
  }

  private setChangeStatus() {
    this.newChangeStatus.username = this.auth.getUserInfo().username;
    this.newChangeStatus.opportunityStatus = this.selectedOptionStatus;
    this.newChangeStatus.date = new Date();
    this.modifyStatus.changeStatus = this.newChangeStatus;
  }

  private setTracing() {
    let message = `Cambio de estado [${this.modifyStatus.opportunityStatus.name}]`;
    if (this.modifyStatus.tracing.comment != null)
      message = `${message}: ${this.modifyStatus.tracing.comment}`;
    this.modifyStatus.tracing.date = new Date();
    this.modifyStatus.tracing.person = this.person;
    this.modifyStatus.tracing.comment = message;
  }
}
