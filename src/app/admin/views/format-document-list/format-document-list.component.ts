import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { FormatDocument } from '../../model/FormatDocument';
import { FormatDocumentService } from '../../services/format-document.service';
import { FormatDocumentEditComponent } from '../format-document-edit/format-document-edit.component';

@Component({
  selector: 'app-format-document-list',
  templateUrl: './format-document-list.component.html',
  styleUrls: ['./format-document-list.component.scss'],
  providers: [DialogService, DynamicDialogRef],
})
export class FormatDocumentListComponent implements OnInit {
  isLoading: Boolean = false;
  formatDocuments: FormatDocument[];
  headerChoice: string = 'Nuevo formato';
  cloneFormatDocument: FormatDocument;
  formatDocumentDelete: FormatDocument;

  constructor(
    private formatDocumentService: FormatDocumentService,
    private dinamicDialogService: DialogService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getAllFormatDocument();
  }

  getAllFormatDocument() {
    this.isLoading = true;
    this.formatDocumentService.getAllFormatDocument().subscribe({
      next: (res: FormatDocument[]) => {
        this.formatDocuments = res;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onEditFormatDocument(formatDocument?: FormatDocument) {
    if (formatDocument == null) formatDocument = new FormatDocument();
    else this.headerChoice = `Editar ${formatDocument.name}`;

    const ref = this.dinamicDialogService.open(FormatDocumentEditComponent, {
      header: this.headerChoice,
      width: '40%',
      data: { ...formatDocument },
      closable: false,
    });
    ref.onClose.subscribe((recharge: Boolean) => {
      if (recharge) this.getAllFormatDocument();
    });
  }

  showDialog(formatDocument: FormatDocument) {
    this.formatDocumentDelete = formatDocument;
    this.snackbarService.showConfirmDialog();
  }

  closeDialog() {
    this.snackbarService.closeConfirmDialog();
  }

  confirmDeletion() {
    this.deleteItem(this.formatDocumentDelete);
  }

  deleteItem(formatDocument: FormatDocument) {
    this.formatDocumentService
      .deleteFormatDocument(formatDocument.id)
      .subscribe({
        next: () => {
          this.snackbarService.showMessage(
            'El registro se ha borrado con éxito'
          );
          this.closeDialog();
          this.getAllFormatDocument();
        },
        error: () => {
          this.snackbarService.error(
            'El registro no puede ser eliminado porque se está usando en alguna oferta'
          );
          this.closeDialog();
        },
        complete: () => {},
      });
  }
}
