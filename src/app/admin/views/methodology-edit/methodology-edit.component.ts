import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MethodologyService } from '../../services/methodology.service';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-methodology-edit',
  templateUrl: './methodology-edit.component.html',
  styleUrls: ['./methodology-edit.component.scss']
})
export class MethodologyEditComponent implements OnInit {

  data: Methodology;
  showEditMessage: boolean;
  
  constructor(private methodologyService: MethodologyService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,) { }

  ngOnInit(): void {
    
    if (this.config.data != null) {
      this.data = Object.assign({methodologyData: Methodology}, this.config.data.methodologyData);
    } else {
      this.data = new Methodology();
    }

    this.showEditMessage = false;
  }

  editMethodology(item: Methodology) {

    if (item.name != "" && item.priority > 0) {
      this.methodologyService.saveMethodology(item).subscribe({
        next: () => { 
          this.showEditMessage = false;
          this.onClose();
        },
        error: () => { 
          this.showEditMessage = true;
        }
      });
    } else {
      this.showEditMessage = false;
    }
  }

  onClose() {
    this.ref.close();
  }
}
