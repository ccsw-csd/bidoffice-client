import { Component, OnInit } from '@angular/core';
import { ProjectType } from "../../model/ProjectType";
import { ProjectTypeService } from "../../services/project-type.service";
import { ConfirmationService } from "primeng/api";
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProjectTypeEditComponent } from "../project-type-edit/project-type-edit.component";

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss'],
  providers: [ConfirmationService, DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class ProjectTypeListComponent implements OnInit {

  listoOfData: ProjectType[];
  isLoading: boolean = false;

  constructor(
    private projectTypeService: ProjectTypeService,
    private confirmationService: ConfirmationService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
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
      message: 'Si borra el tipo de proyecto, se eliminarán los datos del mismo.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
      acceptLabel: 'Aceptar',
      acceptIcon: 'ui-icon-blank',
      rejectLabel: 'Cancelar',
      rejectIcon: 'ui-icon-blank',
      key: "projectTypeDeleteDialog",
      accept: () => {
        this.projectTypeService.delete(element.id).subscribe({
          next: () => {
            this.findAll();
          },
          error:() => {
            this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
            this.findAll();
          },
          complete: () => {
            this.snackbarService.showMessage('El registro se ha borrado con éxito')
          }
        });
      },
      reject: () => {
        this.findAll();
      }
    });
  }

  editItem(item?: ProjectType){
    if(item!=null){
      this.ref = this.dialogService.open(ProjectTypeEditComponent, {
        header: 'Editar' + item.name,
        width: '40%',
        data: {
            projectTypeData:item
        },
        closable: false
      });
    }
    else{
      this.ref = this.dialogService.open(ProjectTypeEditComponent, {
        header: 'Nuevo item',
        width: '40%',
        data:{},
        closable: false
      });
    }
    this.onClose();
  }

  onClose(): void{
    this.ref.onClose.subscribe(
      (results:any) => {
        this.findAll();
      }
    )
  }



}
