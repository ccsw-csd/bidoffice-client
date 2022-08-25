import { Component, OnInit } from '@angular/core';
import { ProjectType } from "../../model/ProjectType";
import { ProjectTypeService } from "../../services/project-type.service";
import { ConfirmationService } from "primeng/api";
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss'],
})
export class ProjectTypeListComponent implements OnInit {

  listoOfData: ProjectType[];
  isLoading: boolean = false;

  constructor(
    private projectTypeService: ProjectTypeService,
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

  showDialog(){  
    this.snackbarService.showConfirmDialog()
  }

  cancel(){
    this.findAll()
  }

  delete(element: ProjectType){
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
  }

}
