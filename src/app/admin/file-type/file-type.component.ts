import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FileType } from './model/FileType';

@Component({
  selector: 'app-file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss']
})
export class FileTypeComponent implements OnInit {

  public dataSource : FileType[]

  constructor(
    private adminService: AdminService,
    ) { }

  ngOnInit(): void {

    this.adminService.getFileTypes().subscribe(
      files=>this.dataSource = files
    )
  }

}
