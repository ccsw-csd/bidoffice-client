import { Component, OnInit } from '@angular/core';
import { Methodology } from '../../model/Methodology';
import { MethodologyService } from '../../services/methodology.service';
import { MethodologyEditComponent } from '../methodology-edit/methodology-edit.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-methodology-list',
  templateUrl: './methodology-list.component.html',
  styleUrls: ['./methodology-list.component.scss'],
})
export class MethodologyListComponent implements OnInit {

  methodologyItemList: Methodology[];
  display: Boolean = false;
  isLoading: boolean = false;
  isDeleted: boolean = false;
  item: Methodology

  constructor(
    private methodologyService: MethodologyService,
    private dynamicDialogService: DialogService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.isLoading = true;
    this.methodologyService.findAll().subscribe({
        next: (res: Methodology[]) => { 
          this.methodologyItemList = res;
        },
        error: () => {},
        complete: () => {
          this.isLoading = false;
        }
    });
  }
  
  showEditDialog(methodologyItem: Methodology) {
    const ref = this.dynamicDialogService.open(MethodologyEditComponent, {
      header: "Editar " + methodologyItem.name,
      width: "40%",
      data: {methodologyData: methodologyItem},
      closable: false
    });

    ref.onClose.subscribe( res => {
      this.findAll();
    });
  }

  showCreateDialog() {
    const ref = this.dynamicDialogService.open(MethodologyEditComponent, {
      header: "Nuevo elemento",
      width: "40%",
      closable: false
    });

    ref.onClose.subscribe( res => {
      this.findAll();
    });
  }

  showDialog(element?: Methodology){   
    this.item=element 
    this.snackbarService.showConfirmDialog()
  }

  changeFlagForDelete(){
    this.isDeleted = true
    this.deleteItem(this.item)
  }

  close(){
    this.snackbarService.closeConfirmDialog()
    if(this.isDeleted==false){
      this.findAll()
    }
  }

  deleteItem(methodologyItem?: Methodology){
    if(this.isDeleted){
      this.methodologyService.delete(methodologyItem.id).subscribe({
        next:() => {  
          this.snackbarService.showMessage('El registro se ha borrado con éxito')
        },
        error:() => {
          this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
          this.close()
        },
        complete: () => {   
          this.isDeleted = false 
          this.close()        
        } 
      }) 
    }
  }
}
