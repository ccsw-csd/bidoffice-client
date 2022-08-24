import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MethodologyService } from '../../services/methodology.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-methodology-edit',
  templateUrl: './methodology-edit.component.html',
  styleUrls: ['./methodology-edit.component.scss']
})
export class MethodologyEditComponent implements OnInit {

  data: Methodology;
  
  constructor(private methodologyService: MethodologyService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private snackbarService: SnackbarService,) { }

  ngOnInit(): void {
    
    if (this.config.data != null) {
      this.data = Object.assign({methodologyData: Methodology}, this.config.data.methodologyData);
    } else {
      this.data = new Methodology();
    }
  }

  editMethodology(item: Methodology) {

    if (item.name != "" && item.priority > 0) {
      this.methodologyService.saveMethodology(item).subscribe({
        next: () => { 
          this.snackbarService.showMessage('El registro se ha guardado con éxito')
          this.onClose();
        },
        error: () => { 
          this.snackbarService.error('El registro tiene la misma prioridad o nombre que otro registro y no se puede guardar');
        }
      });
    }
  }

  onClose() {
    this.ref.close();
  }

}
