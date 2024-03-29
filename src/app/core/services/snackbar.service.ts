import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})

export class SnackbarService {
  
  constructor(
    private messageService: MessageService, 
    ) { }


  public error(text: string) : void {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showMessage(message: string) {
    this.messageService.add({severity:'success', summary: 'Ok', detail: message});
  }
  
}

/*

  showConfirmDialog(){
    this.confirmationService.confirm({
      header: '¡ Atención !',
      message: 'Si borra el registro, se eliminarán los datos del mismo.<br>Esta acción no se puede deshacer.<br><br>¿Está de acuerdo?',
    })
  }

  showMessageConfirm(headear: string, message: string){
    this.confirmationService.confirm({
      header: headear,
      message: message,
    })
  }

  closeConfirmDialog(){
    this.confirmationService.close()
  }



*/