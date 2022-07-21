import { Component, OnInit } from '@angular/core';
import { FileTypeService } from '../../services/file-type.service';
import { FileType } from '../../model/FileType';

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type-list.component.html',
  styleUrls: ['./file-type-list.component.scss']
})
export class FileTypeListComponent implements OnInit {

  public dataSource : FileType[]

  constructor(
    private fileTypeService: FileTypeService,
    ) { }

  ngOnInit(): void {

    this.fileTypeService.getFileTypes().subscribe(
      files=>this.dataSource = files
    )
  }

}
