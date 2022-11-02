import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { FormatDocument } from '../../model/FormatDocument';
import { FormatDocumentService } from '../../services/format-document.service';

@Component({
  selector: 'app-format-document-edit',
  templateUrl: './format-document-edit.component.html',
  styleUrls: ['./format-document-edit.component.scss'],
})
export class FormatDocumentEditComponent implements OnInit {
  formatForm: FormGroup;
  formatDocument: FormatDocument;
  constructor(
    private formatDocumentService: FormatDocumentService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.formatDocument = this.config.data;
    this.formatForm = this.formBuilder.group({
      name: ['', Validators.required],
      priority: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSave() {
    this.formatDocumentService
      .saveFormatDocument(this.formatDocument)
      .subscribe({
        next: (res: FormatDocument) => {
          this.snackbarService.showMessage(
            'El registro se ha guardado con éxito'
          );
          this.onClose(true);
        },
        error: () => {
          this.snackbarService.error(
            'El registro tiene la misma prioridad o nombre que otro registro y no se puede guardar'
          );
        },
        complete: () => {},
      });
  }

  onClose(recharge: Boolean) {
    this.ref.close(recharge);
  }
}
