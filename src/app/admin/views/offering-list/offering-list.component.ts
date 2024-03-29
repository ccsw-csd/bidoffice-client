import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Offering } from '../../model/Offering';
import { OfferingService } from '../../services/offering.service';
import { OfferingEditComponent } from '../offering-edit/offering-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Offer } from 'src/app/offer/model/Offer';
import { GeneralConfirmationService } from 'src/app/core/services/general-confirmation.service';

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

    constructor(private offeringService: OfferingService,
        private dialogService: DialogService,
        private ref: DynamicDialogRef, 
        private snackbarService: SnackbarService,
        private confirmationService : GeneralConfirmationService,
    ) { }

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
        this.confirmationService.showConfirmDialog()
    }

    /**
     * Cierra el cuadro de confirmación sin realizar
     * ninguna acción.
     */
     closeDialog() {
        this.confirmationService.closeConfirmDialog();
    }

    /**
     * Cierra el cuadro de confirmación, intentando
     * borrar posteriormente el sector implicado.
     */
    confirmDeletion() {
        this.confirmationService.closeConfirmDialog();
        this.deleteOffering(this.item);  
    }

    deleteOffering(element: Offering): void{
        this.offeringService.deleteOffering(element.id).subscribe({
            next:() => {
                this.snackbarService.showMessage('El registro se ha borrado con éxito')     
            },
            error:() => {
                this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta')
                this.closeDialog()
            },
            complete:() =>{
                this.getAll();
            }
        })
    }
  
    onClose(message?: string): void{
        let opt: number
        this.ref.onClose.subscribe( 
            (results: boolean) => {
                if (results) this.getAll();
            }
        );
    }
}
