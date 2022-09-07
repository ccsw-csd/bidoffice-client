import { Component, OnInit } from '@angular/core';
import { ProjectType } from "../../model/ProjectType";
import { ProjectTypeService } from "../../services/project-type.service";
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProjectTypeEditComponent } from "../project-type-edit/project-type-edit.component";

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class ProjectTypeListComponent implements OnInit {

  listoOfData: ProjectType[];
  isLoading: boolean = false;
  item: ProjectType;
  isDeleted: boolean = false;

  constructor(
    private projectTypeService: ProjectTypeService,
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

  showDialog(element?: ProjectType){
    this.item=element
    this.snackbarService.showConfirmDialog()
  }

  changeFlagForDelete(){
    this.isDeleted = true
    this.delete(this.item)
  }

  closeDialog(){
    this.snackbarService.closeConfirmDialog()
    if(this.isDeleted==false){
      this.findAll()
    }
  }
  delete(element: ProjectType){
    this.projectTypeService.delete(element.id).subscribe({
      next: () => {
        this.snackbarService.showMessage('El registro se ha borrado con éxito')
      },
      error:() => {
        this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
        this.closeDialog()
      },
      complete: () => {
        this.isDeleted = false
        this.closeDialog()
      }
    });
  }

  editItem(item?: ProjectType){
    if(item!=null){
      this.ref = this.dialogService.open(ProjectTypeEditComponent, {
        header: 'Editar ' + item.name,
        width: '40%',
        data: {
          projectTypeData:item
        },
        closable: false
      });
    }
    else{
      this.ref = this.dialogService.open(ProjectTypeEditComponent, {
        header: 'Nuevo elemento',
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
