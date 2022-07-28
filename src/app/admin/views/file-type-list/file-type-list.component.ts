import { Component, OnInit } from '@angular/core';
import { FileTypeService } from '../../services/file-type.service';
import { FileType } from '../../model/FileType';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-file-type',
  templateUrl: './file-type-list.component.html',
  styleUrls: ['./file-type-list.component.scss'],
  providers:[ConfirmationService, MessageService]
})
export class FileTypeListComponent implements OnInit {

  public dataSource : FileType[]
  public exception: boolean


  constructor(
    private fileTypeService: FileTypeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {

    this.fileTypeService.getFileTypes().subscribe(
      files=>this.dataSource = files
    )
  }

  

  deleteFileType(fileType: FileType) {    
    
    this.confirmationService.confirm({
      message: 'Seguro que quiere borrar el item?',
      accept: () => {
        this.fileTypeService.deleteFileTypeById(fileType).subscribe({
          next: () =>{
            this.exception=false 
            this.ngOnInit()
          },
          error:() =>{            
             this.showMessageError();
              this.exception=true;
              this.ngOnInit()
          }
      })
        
      },
      reject: () =>{
        this.ngOnInit();
      }
    })

  }  

  showMessageError(){
    this.messageService.add({key: 'deleteError', severity:'error', summary: 'ERROR', detail: 'No puedes borrar un item asociado a una oferta'});
  }
 
  
}

