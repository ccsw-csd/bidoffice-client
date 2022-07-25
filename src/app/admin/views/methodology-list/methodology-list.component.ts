import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { MethodologyService } from '../../services/methodology.service';

@Component({
  selector: 'app-methodology-list',
  templateUrl: './methodology-list.component.html',
  styleUrls: ['./methodology-list.component.scss']
})
export class MethodologyListComponent implements OnInit {

  methodologyItemList: Methodology[];

  constructor(private methodologyService: MethodologyService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.methodologyService.findAll().subscribe({
        next: (res: Methodology[]) => { 
          this.methodologyItemList = res;
        },
        error: () => {},
        complete: () => {}
    });
  }
}
