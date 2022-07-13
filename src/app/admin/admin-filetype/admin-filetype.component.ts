import { Component, Input, OnInit } from '@angular/core';
import { Hyperscaler } from '../model/Hyperscaler';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-filetype',
  templateUrl: './admin-filetype.component.html',
  styleUrls: ['./admin-filetype.component.scss']
})
export class AdminFiletypeComponent implements OnInit {
  public listOfData: Hyperscaler[]
  public cols: any[];
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getDataHyperscale().subscribe(
      results => this.listOfData = results
    );

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'priority', header: 'Priority' },
  ];
  }

}
