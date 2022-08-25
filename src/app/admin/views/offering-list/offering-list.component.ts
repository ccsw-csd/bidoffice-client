import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Offering } from '../../model/Offering';
import { OfferingService } from '../../services/offering.service';
import { OfferingEditComponent } from '../offering-edit/offering-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-offering-list',
  templateUrl: './offering-list.component.html',
  styleUrls: ['./offering-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class OfferingListComponent implements OnInit {

  offeringList: Offering[];
  isLoading: boolean = false;

  constructor(private offeringService: OfferingService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef, 
    private snackbarService: SnackbarService) { }

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

  showDialog(){  
    this.snackbarService.showConfirmDialog()
  }

  cancel(){
    this.getAll()
  }

  deleteOffering(element: Offering): void{
    this.offeringService.deleteOffering(element.id).subscribe({
      next:() => {
        this.snackbarService.showMessage('El registro se ha borrado con éxito')
        this.getAll()
      },
      error:() => {
        this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta')
        this.getAll()
      } 
    })
  }
  
  onClose(message?: string): void{
    let opt: number
    this.ref.onClose.subscribe( 
      (results) => {
        this.getAll()   
    });
  }
}
