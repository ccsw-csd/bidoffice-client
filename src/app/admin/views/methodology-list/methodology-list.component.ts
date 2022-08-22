import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { MethodologyService } from '../../services/methodology.service';
import { MethodologyEditComponent } from '../methodology-edit/methodology-edit.component';
import { DialogService } from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-methodology-list',
  templateUrl: './methodology-list.component.html',
  styleUrls: ['./methodology-list.component.scss'],
  providers: [ConfirmationService]
})
export class MethodologyListComponent implements OnInit {

  methodologyItemList: Methodology[];
  display: Boolean = false;
  isLoading: boolean = false;

  constructor(
    private methodologyService: MethodologyService,
    private dynamicDialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoading = true;
    this.methodologyService.findAll().subscribe({
        next: (res: Methodology[]) => { 
          this.methodologyItemList = res;
        },
        error: () => {},
        complete: () => {
          this.isLoading = false;
        }
    });
  }
  
  showEditDialog(methodologyItem: Methodology) {
    const ref = this.dynamicDialogService.open(MethodologyEditComponent, {
      header: "Editar metodología",
      width: "40%",
      data: {methodologyData: methodologyItem},
      closable: false
    });

    ref.onClose.subscribe( res => {
      this.findAll();
    });
  }

  showCreateDialog() {
    const ref = this.dynamicDialogService.open(MethodologyEditComponent, {
      header: "Crear metodología",
      width: "40%",
      closable: false
    });

    ref.onClose.subscribe( res => {
      this.findAll();
    });
  }

  deleteItem(methodologyItem?: Methodology){
    this.confirmationService.confirm({   
      message: 'Si borra la metodologia, se eliminarán los datos de la misma.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
      header: '¡ Atención !',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      acceptIcon: 'ui-icon-blank',
      rejectLabel: 'Cancelar',
      rejectIcon: 'ui-icon-blank',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.methodologyService.delete(methodologyItem.id).subscribe({
          next:() => {  
            this.findAll()
          },
          error:() => {
            this.showErrorMessage()
            this.findAll()
          },
          complete: () => {
            this.showSuccessMessage();
          } 
        })
      },
      reject: () => {
        this.findAll()
      }
    });
  }

  showErrorMessage(){
    this.messageService.add({
      key: 'methodologyMessage',
      severity:'error', 
      summary:'Error', 
      detail:'El registro no puede ser eliminado porque se está usando en alguna oferta'});
  }
  
  showSuccessMessage(){
    this.messageService.add({
      key: 'methodologyMessage',
      severity:'success', 
      summary:'Éxito', 
      detail:'La operación se ha llevado a cabo correctamente'});
  }
}
