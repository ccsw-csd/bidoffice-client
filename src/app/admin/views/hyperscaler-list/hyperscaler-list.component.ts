import { Component, Input, OnInit } from '@angular/core';
import { Hyperscaler } from '../../model/Hyperscaler';
import { HyperscalerService } from '../../services/hyperscaler.service';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { HyperscalerEditComponent } from '../hyperscaler-edit/hyperscaler-edit.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';



@Component({
  selector: 'app-hyperscaler',
  templateUrl: './hyperscaler-list.component.html',
  styleUrls: ['./hyperscaler-list.component.scss'],
  providers: [DialogService,DynamicDialogRef,DynamicDialogConfig]
})
export class HyperscalerListComponent implements OnInit {
  public listOfData: Hyperscaler[]
  public cols: any[];
  public isLoading: boolean = false
  public isDeleted: boolean = false
  public item: Hyperscaler

  
  constructor(private hyperscalerService: HyperscalerService, 
    private dialogService: DialogService,
    private ref: DynamicDialogRef, 
    private snackbarService: SnackbarService,
    ) { }

  ngOnInit(): void {
    this.getDataHyperscaler()  
  }

  getDataHyperscaler(): void{
    this.isLoading = true
    this.hyperscalerService.getDataHyperscaler().subscribe({
      next: (results:any) => { 
        this.listOfData = results     
      },
      error: () => {
      },
      complete: () =>{
        this.isLoading = false
      }
    });
  }

  editHyperscaler(element?: Hyperscaler): void{
      if(element!=null){
        this.ref = this.dialogService.open(HyperscalerEditComponent, {
          header: 'Editar '+element.name,
          width: '40%',
          data: {
            hyperscalerData: element
          },
          closable: false
        }); 
      }
      else{
        this.ref = this.dialogService.open(HyperscalerEditComponent, {
          header: 'Nuevo elemento',
          width: '40%',
          data: {
          },
          closable: false
        });     
    }
    this.onClose()
  }

  onClose(): void{
    this.ref.onClose.subscribe( 
      (results:any) => {
        this.getDataHyperscaler()   
    });
  }

  showDialog(element?: Hyperscaler){   
    this.item=element 
    this.snackbarService.showConfirmDialog()
  }

  changeFlagForDelete(){
    this.isDeleted = true
    this.deleteRow(this.item)
  }

  closeDialog(){
    this.snackbarService.closeConfirmDialog()
    if(this.isDeleted==false){
      this.getDataHyperscaler()
    }
  }

  deleteRow(element?: Hyperscaler): void{
    if(this.isDeleted == true){
        this.hyperscalerService.deleteHyperscaler(element.id).subscribe({
          next:() => {
            this.snackbarService.showMessage('El registro se ha borrado con éxito')
          },
          error:() => {
            this.snackbarService.error('El registro no puede ser eliminado porque se está usando en alguna oferta');
            this.closeDialog()
          },
          complete:()  =>{  
            this.isDeleted = false
            this.closeDialog()
          }
        })     
    }
  }

}


