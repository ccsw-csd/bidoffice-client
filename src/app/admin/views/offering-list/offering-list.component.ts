import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Offering } from '../../model/Offering';
import { OfferingService } from '../../services/offering.service';
import { OfferingEditComponent } from '../offering-edit/offering-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Offer } from 'src/app/offer/model/Offer';

@Component({
  selector: 'app-offering-list',
  templateUrl: './offering-list.component.html',
  styleUrls: ['./offering-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class OfferingListComponent implements OnInit {

  offeringList: Offering[];
  isLoading: boolean = false;
  item: Offering;
  isDeleted: boolean;

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
    let headerChoice;
    let dataChoice;

    if (offering != null) {
        headerChoice = 'Editar ' + offering.name;
        dataChoice = offering;
    }
    else {
        headerChoice = 'Nuevo offering';
        dataChoice = new Offering();
    }
    
    this.ref = this.dialogService.open(OfferingEditComponent, {
        header: headerChoice,
        width: '40%',
        data: {
            offering: dataChoice,
        },
        closable: false
    }); 
    
    this.onClose(message)
  }

  showDialog(element?: Offering){   
    this.item=element 
    this.snackbarService.showConfirmDialog()
  }

  changeFlagForDelete(){
    this.isDeleted = true
    this.deleteOffering(this.item)
  }

  closeDialog(){
    this.snackbarService.closeConfirmDialog()
    if(this.isDeleted==false){
      this.getAll()
    }
  }

  deleteOffering(element: Offering): void{
    if(this.isDeleted){
      this.offeringService.deleteOffering(element.id).subscribe({
        next:() => {
          this.snackbarService.showMessage('El registro se ha borrado con éxito')     
        },
        error:() => {
          this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta')
          this.closeDialog()
        },
        complete:() =>{
          this.isDeleted = false
          this.closeDialog()
        }
      })
    } 
  }
  
  onClose(message?: string): void{
    let opt: number
    this.ref.onClose.subscribe( 
      (results: boolean) => {
        if (results) this.getAll();
    });
  }
}
