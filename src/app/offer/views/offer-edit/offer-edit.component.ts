import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Offer } from '../../model/Offer';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OfferEditComponent implements OnInit {
  activeItem: number = 0;
  offer: Offer;
  offerForm: FormGroup;
  chanceForm: FormGroup;
  offerStatus: string;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private offerService: OfferService,
    private snackbarService: SnackbarService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
        state: ['', Validators.required],
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
        opportunityWin: [''],
        observations: [''],
      }),
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onSave() {
    if (this.offerForm.valid) {
      this.offer.tracings.forEach((item) => delete item.uuid);
      this.offer.dataFiles.forEach((item) => delete item.uuid);
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
          this.ref.close();
        },
      });
    } else {
      Object.keys(this.offerForm.controls).forEach((control) =>
        this.offerForm.controls[control].markAsDirty()
      );
      this.offerForm.markAllAsTouched();
    }
  }
  onClose() {
    this.ref.close();
  }
}
