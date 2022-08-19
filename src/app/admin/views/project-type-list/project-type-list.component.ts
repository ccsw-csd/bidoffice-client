import { Component, OnInit } from '@angular/core';
import { ProjectType } from "../../model/ProjectType";
import { ProjectTypeService } from "../../services/project-type.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss'],
  providers: [ConfirmationService]
})
export class ProjectTypeListComponent implements OnInit {

  listoOfData: ProjectType[];
  isLoading: boolean = false;

  constructor(
    private projectTypeService: ProjectTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.isLoading = true;
    this.projectTypeService.findAll().subscribe({
      next: (results) => {
        this.listoOfData = results;
      },
      error: ()=>{},
      complete: () => { this.isLoading = false; }
      });
  }

  delete(element: ProjectType){
    this.confirmationService.confirm({
      header: "¡ Atención !",
      message: 'Si borra el tipo de proyecto, se eliminarán los datos de la misma.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      key: "projectTypeDeleteDialog",
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.projectTypeService.delete(element.id).subscribe({
          next: () => {
            this.findAll();
          },
          error:() => {
            this.showErrorMessage();
            this.findAll();
          },
          complete: () => {
            this.showSuccessMessage();
          }
        });
      },
      reject: () => {
        this.findAll();
      }
    });
  }

  showErrorMessage() {
    this.messageService.add({
      key: 'methodologyMessage',
      severity:'error',
      summary:'Error',
      detail:'El tipo de prouecto no puede ser eliminado porque se está usando en alguna oferta'});
  }

  showSuccessMessage(){
    this.messageService.add({
      key: 'projectTypeMessage',
      severity:'success',
      summary:'Éxito',
      detail:'La operación se ha llevado a cabo correctamente'});
  }

}
