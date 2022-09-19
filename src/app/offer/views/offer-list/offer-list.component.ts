import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import { OfferItemList } from '../../model/OfferItemList';
import { OfferPage } from '../../model/OfferPage';
import { OfferService } from '../../services/offer.service';
import { OfferEditComponent } from '../offer-edit/offer-edit.component';
import { Offer } from '../../model/Offer';
import { StatusChangeComponent } from './status-change/status-change.component';
import { BaseClass } from '../../model/BaseClass';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OfferListComponent implements OnInit {
  readonly labelInFinish: string = 'Finalizada';
  pageable: Pageable = {
    pageNumber: 0,
    pageSize: 10,
    sort: [
      {
        property: 'id',
        direction: 'asc',
      },
    ],
  };
  readonly labelInProgress: string = 'En curso';
  readonly labelInGoNoGo: string = 'Pendiente Go/NoGo';
  offerPage: OfferPage;
  offerItemList: OfferItemList[];
  totalElements: number;
  isloading: boolean = false;
  selectedOffer: Offer = new Offer();
  opportunityStatusOption: BaseClass[];
  constructor(
    private offerService: OfferService,
    private cdRef: ChangeDetectorRef,
    private dinamicDialogService: DialogService,
  ) {}

  ngOnInit(): void {

    this.loadPage();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  loadPage(event?: LazyLoadEvent) {
    if (event != null) {
      this.pageable.pageSize = event.rows;
      this.pageable.pageNumber = event.first / event.rows;

      if (event.sortField != null) {
        this.pageable.sort = [
          {
            property: event.sortField,
            direction: event.sortOrder == 1 ? 'asc' : 'desc',
          },
        ];
      }
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
      },
    });
  }

  toOfferEdit() {
    const ref = this.dinamicDialogService.open(OfferEditComponent, {
      header: 'Nueva oferta',
      width: '70%',
      height: '750px',
      data: this.selectedOffer,
      closable: false,
    });

    ref.onClose.subscribe(() => {
      this.selectedOffer = null;
      this.loadPage();
    });
  }
  onRowSelected(offer: Offer) {
    this.isloading = true;
    this.offerService.getOffer(offer.id).subscribe({
      next: (res: Offer) => {
        this.selectedOffer = Object.assign(new Offer(), res);
        this.selectedOffer.parseStringToDate();
      },
      error: () => {
        this.isloading = true;
      },
      complete: () => {
        this.isloading = false;
        this.toOfferEdit();
      },
    });
  }

  onStatusChange(offerItemList: OfferItemList) {
    const ref = this.dinamicDialogService.open(StatusChangeComponent, {
      header: 'Cambio de estado',
      width: '40%',
      data: offerItemList,
      closable: false,
    });

    ref.onClose.subscribe(() => {
      this.loadPage();
    });
  }

  isNotStatushFinish(optionStatus: string): boolean {
    return optionStatus != this.labelInFinish;
  }
}
