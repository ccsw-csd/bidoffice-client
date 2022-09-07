import { Component, OnInit, Inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Offering } from '../../model/Offering';
import { OfferingService } from '../../services/offering.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-offering-edit',
  templateUrl: './offering-edit.component.html',
  styleUrls: ['./offering-edit.component.scss']
})
export class OfferingEditComponent implements OnInit {

  offering: Offering
  isLoading: boolean = false

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private offeringService: OfferingService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    if (this.config.data != null) {
      this.offering = Object.assign({offering: Offering}, this.config.data.offering);
    } else{
      this.offering = new Offering();
    }
    
  }

  onSave(offering: Offering){
    this.offeringService.saveOffering(offering).subscribe({
      next: (res: Offering)=> {
        this.snackbar.showMessage('El registro se ha guardado con éxito')
        this.ref.close()
        this.offering = res;
      }, 
      error: ()=>{
        this.snackbar.error('El registro tiene la misma prioridad o nombre que otro registro')
      }
    });
  }  

  onClose() {
    this.ref.close();
  }
}
