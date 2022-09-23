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

    /**
     * Cierra el cuadro de confirmación sin realizar
     * ninguna acción.
     */
    closeDialog() {
        this.snackbarService.closeConfirmDialog();
    }

    /**
     * Cierra el cuadro de confirmación, intentando
     * borrar posteriormente el sector implicado.
     */
    confirmDeletion() {
        this.snackbarService.closeConfirmDialog();
        this.delete(this.item);  
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
                this.findAll();
            }
        });
    }

    /**
     * Guarda los datos de un nuevo ProjectType o
     * modifica los de un ProjectType existente.
     * @param item 
     */
    editItem(item?: ProjectType){

        let headerChoice;
        let dataChoice;

        if (item != null) {
            headerChoice = 'Editar ' + item.name;
            dataChoice = item;
        }
        else {
            headerChoice = 'Nuevo tipo de proyecto';
            dataChoice = new ProjectType();
        }

        this.ref = this.dialogService.open(ProjectTypeEditComponent, {
            header: headerChoice,
            width: '40%',
            data: {
                projectTypeData: dataChoice,
            },
            closable: false
        });

        this.onClose();
    }

    /**
     * onClose se activa cuando se cierra el cuadro de diálogo
     * de edición. Recoge como respuesta si se ha actualizado/
     * creado un nuevo registro. En caso afirmativo, actualiza
     * la tabla.
     */
    onClose(): void{

        this.ref.onClose.subscribe(
            (results: boolean) => {
                if (results) { this.findAll(); }
            }
        );
    }

}
