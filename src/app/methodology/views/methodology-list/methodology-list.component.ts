import { Component, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/offer/model/BaseClass';
import { MethodologyService } from '../../services/methodology.service';

@Component({
  selector: 'app-methodology-list',
  templateUrl: './methodology-list.component.html',
  styleUrls: ['./methodology-list.component.scss']
})
export class MethodologyListComponent implements OnInit {

  methodologyItemList: BaseClass[];

  constructor(private methodologyService: MethodologyService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.methodologyService.findAll().subscribe({
        next: (res: BaseClass[]) => { 
          this.methodologyItemList = res;
        },
        error: () => {},
        complete: () => {}
    });
  }
}
