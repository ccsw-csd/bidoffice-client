import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import { OfferItemList } from '../../model/OfferItemList';
import { OfferPage } from '../../model/OfferPage';
import { OfferService } from '../../services/offer.service';
import { OfferEditComponent } from '../offer-edit/offer-edit.component';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class OfferListComponent implements OnInit {

  pageable: Pageable = {
    pageNumber: 0,
    pageSize: 10,
    sort: [{
      property: 'id',
      direction: 'asc'
    }]
  }

  offerPage: OfferPage;
  offerItemList: OfferItemList[];
  totalElements: number;
  isloading: boolean = false;

  constructor(private offerService: OfferService, private cdRef : ChangeDetectorRef, private dinamicDialogService: DialogService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();          
  }

  loadPage(event?:LazyLoadEvent){

    if(event != null){
      this.pageable.pageSize = event.rows;
      this.pageable.pageNumber = event.first / event.rows;

      if (event.sortField != null){
        this.pageable.sort = [{property:event.sortField, direction:event.sortOrder == 1 ? 'asc':'desc'}];
      }
      this.isloading = true;
      this.offerService.findPage(this.pageable).subscribe({
        next: (res: OfferPage) => { 
          this.offerPage = res;
        },
        error: () => {},
        complete: () => {
          this.offerItemList = this.offerPage.content;
          this.totalElements = this.offerPage.totalElements;
          this.isloading = false;
        }     
      });
    }
  }

  toOfferEdit(){
    const ref = this.dinamicDialogService.open(OfferEditComponent, {
      header: 'Nueva oferta',
      width: '70%',
    });

    ref.onClose.subscribe(()=>{
      
    })
  }
}
