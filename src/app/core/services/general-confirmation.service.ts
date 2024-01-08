import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})

export class GeneralConfirmationService {
  
  constructor(
    private confirmationService: ConfirmationService, 
    ) { }

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


  
}

