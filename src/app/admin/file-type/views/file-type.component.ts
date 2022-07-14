import { Component, OnInit } from '@angular/core';
import { FileTypeService } from '../../services/file-type.service';
import { FileType } from '../model/FileType';

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss']
})
export class FileTypeComponent implements OnInit {

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
