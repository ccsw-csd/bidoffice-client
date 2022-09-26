import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SnackbarService } from "../../../core/services/snackbar.service";
import { ProjectType } from "../../model/ProjectType";
import { ProjectTypeService } from "../../services/project-type.service";

@Component({
  selector: 'app-project-type-edit',
  templateUrl: './project-type-edit.component.html',
  styleUrls: ['./project-type-edit.component.scss']
})
export class ProjectTypeEditComponent implements OnInit {

  projectTypeElement: ProjectType;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private projectTypeService: ProjectTypeService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.projectTypeElement = Object.assign({projectTypeData: ProjectType}, this.config.data.projectTypeData)
  }

  saveItem(item: ProjectType) {
    this.projectTypeService.save(item).subscribe({
      next: () => {
        this.snackbarService.showMessage("El registro se ha guardado con exito");
        this.closeWindow(true);
      },
      error: () => {
        this.snackbarService.error("El registro tiene la misma prioridad nombre que otro registro y no se puede guardar");
      }
    })
  }

  closeWindow(result: boolean) {
    if(this.ref) {
      this.ref.close(result);
    }
  }
}
