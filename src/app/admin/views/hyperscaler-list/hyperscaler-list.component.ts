import { Component, Input, OnInit } from '@angular/core';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerService } from '../../services/hyperscaler.service';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { HyperscalerEditComponent } from '../hyperscaler-edit/hyperscaler-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { GeneralConfirmationService } from 'src/app/core/services/general-confirmation.service';

@Component({
    selector: 'app-hyperscaler',
    templateUrl: './hyperscaler-list.component.html',
    styleUrls: ['./hyperscaler-list.component.scss'],
    providers: [DialogService,DynamicDialogRef,DynamicDialogConfig]
})

export class HyperscalerListComponent implements OnInit {
    public listOfData: Hyperscaler[]
    public cols: any[];
    public isLoading: boolean = false
    public item: Hyperscaler
  
    constructor(private hyperscalerService: HyperscalerService, 
        private dialogService: DialogService,
        private ref: DynamicDialogRef, 
        private snackbarService: SnackbarService,
        private confirmationService : GeneralConfirmationService,
        ) { }

    ngOnInit(): void {
        this.getDataHyperscaler()  
    }

    getDataHyperscaler(): void{
        this.isLoading = true
        this.hyperscalerService.getDataHyperscaler().subscribe({
            next: (results:any) => { 
                this.listOfData = results     
            },
            error: () => {
            },
            complete: () =>{
                this.isLoading = false
            }
        });
    }

    editHyperscaler(element?: Hyperscaler): void{

        let headerChoice;
        let dataChoice;

        if (element != null) {
            headerChoice = 'Editar ' + element.name;
            dataChoice = element;
        }
        else {
            headerChoice = 'Nuevo hyperscaler';
            dataChoice = new Hyperscaler();
        }

        this.ref = this.dialogService.open(HyperscalerEditComponent, {
            header: headerChoice,
            width: '40%',
            data: {
                hyperscalerData: dataChoice
            },
            closable: false
        }); 

        this.onClose()
    }

    onClose(): void{
        this.ref.onClose.subscribe( 
        (results:boolean) => {
            if (results) this.getDataHyperscaler();
        });
    }

    showDialog(element?: Hyperscaler){   
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
        this.deleteRow(this.item);  
    }

    deleteRow(element?: Hyperscaler): void{
        this.hyperscalerService.deleteHyperscaler(element.id).subscribe({
            next:() => {
                this.snackbarService.showMessage('El registro se ha borrado con éxito')
            },
            error:() => {
                this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
                this.closeDialog()
            },
            complete:()  =>{  
                this.getDataHyperscaler();
            }
        })     
    }
}