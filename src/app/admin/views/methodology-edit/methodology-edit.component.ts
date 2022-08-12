import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MethodologyService } from '../../services/methodology.service';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService) { }

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
          this.showSuccessMessage();
          this.onClose();
        },
        error: () => { 
          this.showErrorMessage();
        }
      });
    }
  }

  onClose() {
    this.ref.close();
  }

  showSuccessMessage(){
    this.messageService.add({
      key: 'methodologyMessage',
      severity:'success', 
      summary:'Éxito', 
      detail:'La operación se ha llevado a cabo correctamente'});
  }

  showErrorMessage(){
    this.messageService.add({
      key: 'methodologyMessage',
      severity:'error', 
      summary:'Error', 
      detail:'Ya hay un item con el mismo nombre y/o prioridad'});
  }
}
