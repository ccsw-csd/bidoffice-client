import { Component, OnInit } from '@angular/core';
import { FileTypeService } from '../../services/file-type.service';
import { FileType } from '../../model/FileType';
import {ConfirmationService} from 'primeng/api';
import { finalize } from 'rxjs';
import {Message} from 'primeng/api';


@Component({
  selector: 'app-file-type',
  templateUrl: './file-type-list.component.html',
  styleUrls: ['./file-type-list.component.scss'],
  providers:[ConfirmationService]
})
export class FileTypeListComponent implements OnInit {

  public dataSource : FileType[]
  public offersWithSameId :boolean
  public msg: Message[]

  constructor(
    private fileTypeService: FileTypeService,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {

    this.fileTypeService.getFileTypes().subscribe(
      files=>this.dataSource = files
    )
  }

  checkIfOffers(): boolean{
    if(this.offersWithSameId==true)
      return true
    else return false
  }

  deleteFileType(fileType: FileType) {    
    
    this.fileTypeService.checkOffers(fileType.id).pipe(finalize(()=>{
      if(this.offersWithSameId==true){
         this.msg = [{ severity:'error', summary:'Error', detail:'No puede eliminarse porque tiene asociado una oferta'}]

      }else{
        this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          accept: () => {
            this.fileTypeService.deleteFileTypeById(fileType).subscribe(result => {
            this.ngOnInit();
          }); 
        
          },
          reject: () =>{
          this.ngOnInit();
          }
        })
      }
    }))
    .subscribe(result=> this.offersWithSameId=result)

    
  }  
 
  
}

