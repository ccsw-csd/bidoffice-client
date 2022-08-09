import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { MethodologyService } from '../../services/methodology.service';
import { MethodologyEditComponent } from '../methodology-edit/methodology-edit.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-methodology-list',
  templateUrl: './methodology-list.component.html',
  styleUrls: ['./methodology-list.component.scss']
})
export class MethodologyListComponent implements OnInit {

  methodologyItemList: Methodology[];
  display: Boolean = false;
  methodologyItem: Methodology = new Methodology();

  constructor(
    private methodologyService: MethodologyService,
    private dynamicDialogService: DialogService
  ) { }

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
  
  showEditDialog(id: number) {
    this.methodologyItem = this.methodologyItemList[id - 1];
    const ref = this.dynamicDialogService.open(MethodologyEditComponent, {
      header: "Editar metodología",
      width: "40%",
      data: {methodologyData: this.methodologyItem}
    });

    ref.onClose.subscribe( res => {
      this.ngOnInit();
    });
  }
}