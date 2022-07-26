import { Component, OnInit } from '@angular/core';
import { FileTypeService } from '../../services/file-type.service';
import { FileType } from '../../model/FileType';
import {ConfirmationService} from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type-list.component.html',
  styleUrls: ['./file-type-list.component.scss'],
  providers:[ConfirmationService]
})
export class FileTypeListComponent implements OnInit {

  public dataSource : FileType[]

  constructor(
    private fileTypeService: FileTypeService,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {

    this.fileTypeService.getFileTypes().subscribe(
      files=>this.dataSource = files
    )
  }

  deleteFileType(fileType: FileType) {    
    this.fileTypeService.deleteFileTypeById(fileType).pipe(finalize(()=>{
      console.log("Hola")
      this.ngOnInit();
    }))
    .subscribe()

   
    /*
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      accept: () => {
        this.fileTypeService.deleteFileType(fileType).subscribe(result => {
          this.ngOnInit();
        }); 
      },
      reject: () =>{
        this.ngOnInit();
      }
    })
    */
  }  


}

