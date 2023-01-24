import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public ref: DynamicDialogRef) { }

  ngOnInit(): void {
  }
  onClose(){
    this.ref.close();
  }
  onSave(){
    this.ref.destroy();
    
  }
}
