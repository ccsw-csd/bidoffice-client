import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { OfferDataFile } from 'src/app/offer/model/OfferDataFile';
import { OfferService } from 'src/app/offer/services/offer.service';
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

  constructor(
    private offerService: OfferService,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dataFileForm = this.formBuilder.group({
      typeDoc: ['', Validators.required],
      nameFile: ['', Validators.required],
      link: ['', Validators.required],
      observation: [''],
    });
    this.getAllFileTypes();
  }

  getAllFileTypes() {
    this.offerService.getAllFileTypes().subscribe({
      next: (res: BaseClass[]) => {
        this.fileTypes = res;
      },
      error: () => {},
      complete: () => {},
    });
  }

  onSave() {
    if (!this.dataFileForm.invalid) {
      this.dataFile.uuid = uuidv4();
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
