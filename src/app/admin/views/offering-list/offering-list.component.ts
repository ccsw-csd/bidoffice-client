import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Offering } from '../../model/Offering';
import { OfferingService } from '../../services/offering.service';
import { OfferingEditComponent } from '../offering-edit/offering-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-offering-list',
  templateUrl: './offering-list.component.html',
  styleUrls: ['./offering-list.component.scss'],
  providers: [ConfirmationService, DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class OfferingListComponent implements OnInit {

  offeringList: Offering[];
  isLoading: boolean = false;

  constructor(private offeringService: OfferingService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef, 
    private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void{
    this.isLoading = true;
    this.offeringService.getAll().subscribe({
      next: (results) => { 
        this.offeringList = results;
      },
      error: () => {},
      complete: () => {
        this.isLoading = false;
      }     
    });
  }

  saveOffering(offering?: Offering): void{
    let message: string
      if(offering!=null){
        this.ref = this.dialogService.open(OfferingEditComponent, {
          header: 'Editar '+ offering.name,
          width: '40%',
          data: {
            offering: offering
          },
          closable: false
        }); 
      }
      else{
        this.ref = this.dialogService.open(OfferingEditComponent, {
          header: 'Nuevo elemento',
          width: '40%',
          data: {
          },
          closable: false
        });     
    }
    this.onClose(message)
  }

  deleteOffering(element: Offering): void{
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Desea eliminar este elemento?',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cerrar',
      rejectButtonStyleClass: 'p-button-secondary',
      
      accept: () => {
        this.offeringService.deleteOffering(element.id).subscribe({
          next:() => {
            this.snackbar.showMessage('El registro se ha borrado con éxito')
            this.getAll()
          },
          error:() => {
            this.snackbar.error('El registro no puede ser eliminado porque se está usando')
            this.getAll()
          } 
        })
      },
      reject: () => {
        this.getAll()
      }
    });
  }
  
  onClose(message?: string): void{
    let opt: number
    this.ref.onClose.subscribe( 
      (results) => {
        this.getAll()   
    });
  }
}
