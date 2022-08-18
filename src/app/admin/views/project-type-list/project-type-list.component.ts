import { Component, OnInit } from '@angular/core';
import { ProjectType } from "../../model/ProjectType";
import { ProjectTypeService } from "../../services/project-type.service";

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html',
  styleUrls: ['./project-type-list.component.scss']
})
export class ProjectTypeListComponent implements OnInit {

  listoOfData: ProjectType[];
  isLoading: boolean = false;

  constructor(private projectTypeService: ProjectTypeService) { }

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

}
