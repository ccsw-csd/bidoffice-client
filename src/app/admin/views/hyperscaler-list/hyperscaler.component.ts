import { Component, Input, OnInit } from '@angular/core';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerService } from '../../services/hyperscaler.service';

@Component({
  selector: 'app-hyperscaler',
  templateUrl: './hyperscaler.component.html',
  styleUrls: ['./hyperscaler.component.scss']
})
export class HyperscalerComponent implements OnInit {
  public listOfData: Hyperscaler[]
  public cols: any[];
  
  constructor(private hyperscalerService: HyperscalerService) { }

  ngOnInit(): void {
    this.getDataHyperscale()
  }

  getDataHyperscale(): void{
    this.hyperscalerService.getDataHyperscale().subscribe(
      results => this.listOfData = results
    );

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'priority', header: 'Priority' },
  ];
  }

}
