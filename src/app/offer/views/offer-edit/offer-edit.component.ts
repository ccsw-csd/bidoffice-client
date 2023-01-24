import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Offer } from '../../model/Offer';
import { OfferService } from '../../services/offer.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OfferEditComponent implements OnInit {
  activeItem: number = 0;
  offer: Offer;
  offerModification: Offer;
  offerForm: FormGroup;
  chanceForm: FormGroup;
  offerStatus: string;
  isLoading: boolean = false;
  title: string;

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private offerService: OfferService,
    private snackbarService: SnackbarService,
    private cdRef: ChangeDetectorRef,
    private dinamicDialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.title = this.config.header.split(':')[0];
    if (this.config.data != null) {
      this.offerStatus = 'modificada';
      this.offer = this.config.data;
    } else {
      this.offerStatus = 'creada';
      this.offer = new Offer();
    }
    this.offerForm = this.formBuilder.group({
      chance: this.formBuilder.group({
        nameOpportunity: ['', Validators.required],
        client: ['', Validators.required],
        state: [{value: '', disabled: true}, Validators.required],
        requestedBy: [''],
        managedBy: [''],
        requestedDate: ['', Validators.required],
        sector: ['', Validators.required],
        dataProject: [''],
        offerings: [''],
        technologies: [''],
        opportunityType: ['', Validators.required],
        goNogoDate: [''],
        deliveryDate: [''],
        bdcCode: [''],
        opportunityWin: [{value: '', disabled: true}],
        observations: [''],
      }),
    });
    this.chanceForm = this.offerForm.get('chance') as FormGroup;
    this.onChange();
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  onChange(){
    this.chanceForm.get('nameOpportunity').valueChanges.subscribe(value =>{
      if(value != null) this.titleHeader(value);
    })
  }

  onSave() {
    if (this.offerForm.valid) {
      this.deleteUUID();
      this.isLoading = true;
      this.offerService.save(this.offer).subscribe({
        next: (res: Offer) => {
          this.offer = res;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == HttpStatusCode.UnprocessableEntity)
            this.snackbarService.error(
              'Los datos proporcionados no son válidos.'
            );
          else
            this.snackbarService.error(
              'Ha ocurrido un error. Intentelo de nuevo.'
            );
          this.isLoading = true;
        },
        complete: () => {
          this.snackbarService.showMessage(
            `La oferta ha sido ${this.offerStatus} correctamente.`
          );
          this.isLoading = true;
          this.ref.destroy();
        },
      });
    } else {
      Object.keys(this.chanceForm.controls).forEach((control) =>
        this.chanceForm.controls[control].markAsDirty()
      );
      this.offerForm.markAllAsTouched();
    }
  }
  onClose() {
    if(this.offerForm.dirty){
      const ref = this.dinamicDialogService.open(ConfirmDialogComponent, {
        width: '50%',
        height: '50%',
        closable: false,
      });
  
      ref.onClose.subscribe(() => {

        this.ref.close();
      });

    }
  }

  titleHeader(value: string){
    this.config.header = `${this.title}: ${value ? value : ""}`;
  }

  private deleteUUID(){
    this.offer.tracings.forEach((item) => delete item.uuid);
    this.offer.dataFiles.forEach((item) => delete item.uuid);
    this.offer.tradeTrackings.forEach((item) => delete item.uuid);
  }

  offerIsFinished(){
    if(this.offer.opportunityStatus.name == "Finalizada") return true;
    return false;
  }
}
