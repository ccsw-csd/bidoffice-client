import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MethodologyService } from '../../services/methodology.service';

@Component({
  selector: 'app-methodology-edit',
  templateUrl: './methodology-edit.component.html',
  styleUrls: ['./methodology-edit.component.scss']
})
export class MethodologyEditComponent implements OnInit {

  data: Methodology;
  showEditMessage: boolean;
  showEmptyMessage: boolean;
  
  constructor(private methodologyService: MethodologyService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,) { }

  ngOnInit(): void {
    this.data = Object.assign({methodologyData: Methodology}, this.config.data.methodologyData);
    this.showEditMessage = false;
    this.showEmptyMessage = false;
  }

  editMethodology(item: Methodology) {
    if (item.name != "" && item.priority > 0) {
      this.methodologyService.saveMethodology(item).subscribe({
        next: () => { 
          this.showEditMessage = false;
          this.showEmptyMessage = false;
          this.onClose();
        },
        error: () => { 
          this.showEditMessage = true;
          this.showEmptyMessage = false;
        }
      });
    } else {
      this.showEmptyMessage = true;
      this.showEditMessage = false;
    }
  }

  onClose() {
    this.ref.close();
  }
}
