import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { OfferDataFile } from 'src/app/offer/model/OfferDataFile';
import { OfferService } from 'src/app/offer/services/offer.service';
import { ValidateURL } from 'src/app/offer/views/offer-list/validator/ValidatorURL';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-documentation-edit',
  templateUrl: './documentation-edit.component.html',
  styleUrls: ['./documentation-edit.component.scss'],
})
export class DocumentationEditComponent implements OnInit {
  fileTypes: BaseClass[];
  dataFile: OfferDataFile = new OfferDataFile();
  dataFileForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private offerService: OfferService,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.dataFileForm = this.formBuilder.group({
      typeDoc: ['', Validators.required],
      nameFile: ['', Validators.required],
      formatFile: [''],
      link: ['', [Validators.required, ValidateURL]],
      observation: [''],
    });
    if (this.config.data != null) this.dataFile = this.config.data;
    else this.dataFile.uuid = uuidv4();

    this.getAllFileTypes();
  }

  getAllFileTypes() {
    this.isLoading = true;
    this.offerService.getAllFileTypes().subscribe({
      next: (res: BaseClass[]) => {
        this.fileTypes = res;
        this.isLoading = false;
      },
      error: () => {},
      complete: () => {},
    });
  }

  onSave() {
    if (!this.dataFileForm.invalid) {
      this.ref.close(this.dataFile);
    } else {
      Object.keys(this.dataFileForm.controls).forEach((control) =>
        this.dataFileForm.controls[control].markAsDirty()
      );
      this.dataFileForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.ref.close();
  }

  checkValidation(control: string): boolean {
    if (
      this.dataFileForm.get(control).invalid &&
      this.dataFileForm.get(control).touched
    ) {
      this.dataFileForm.controls[control].markAsDirty();
      return true;
    }
    return false;
  }
}
