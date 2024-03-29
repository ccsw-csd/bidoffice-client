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
import { OfferSearch } from '../../model/OfferSearch';
import { Person } from '../../model/Person';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { verfierFilterDate } from './validator/ValidatorDate';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavigatorService } from 'src/app/core/services/navigator.service';
import { ExportService } from 'src/app/core/services/export.service';
import { OfferDataExportList } from '../../model/OfferDataExportList';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OfferListComponent implements OnInit {
  readonly labelInFinish: string = 'Finalizada';
  readonly labelInDesestimada: string = 'Desestimada';
  pageable: Pageable = {
    pageNumber: 0,
    pageSize: 10,
    sort: [
      {
        property: 'lastModification',
        direction: 'desc',
      },
    ],
  };
  readonly labelInProgress: string = 'En curso';
  readonly labelInGoNoGo: string = 'Pendiente Go/NoGo';
  offerPage: OfferPage;
  offerItemList: OfferItemList[];
  totalElements: number;
  offerItemListToExport: OfferItemList[];
  offerDataToExport: OfferDataExportList[];
  isloading: boolean = false;
  isloadingExport: boolean = false;
  selectedOffer: Offer;
  opportunityStatusOption: BaseClass[];
  offerSearch: OfferSearch = new OfferSearch();
  readonly message = 'No se han encontrado resultados';
  groupPerson: any[] = [];
  status: BaseClass[];
  types: BaseClass[];
  sectors: BaseClass[];
  filterForm: FormGroup;
  filterOptions: OfferSearch = new OfferSearch();
  headerChoice = 'Nueva Oportunidad';
  filterStatus: BaseClass[];
  tableWidth: string;
  yesNoOption: any[] = [{value:true, name:'Sí'}, {value:false, name:'No'}];

  constructor(
    private offerService: OfferService,
    private cdRef: ChangeDetectorRef,
    private dinamicDialogService: DialogService,
    private formBuilder: FormBuilder,
    private navigatorService: NavigatorService,
    private authService: AuthService,
    private exportService: ExportService
  ) { }

  ngOnInit(): void {
    this.resizeTable();
    this.navigatorService.getNavivagorChangeEmitter().subscribe(menuVisible => {
      if (menuVisible) this.tableWidth = 'calc(100vw - 255px)';
      else this.tableWidth = 'calc(100vw - 55px)';
    });
    this.filterForm = this.formBuilder.group(
      {
        status: [''],
        type: [''],
        sector: [''],
        requestedBy: [''],
        managedBy: [''],
        involved: [''],
        startDateModification: [''],
        endDateModification: [''],
        client: [''],
        deliveryDate: [''],
        genAi: [''],
        opportunityWin: [''],
      },
      {
        validators: [verfierFilterDate],
      }
    );
    this.filterForm.get;

    forkJoin({
      requestOfferTypes: this.offerService.getAllOfferTypes(),
      requestSectors: this.offerService.getAllSectors(),
      requestOfferStatus: this.offerService.getAllOfferStatus(),
    }).subscribe(
      ({ requestSectors, requestOfferStatus, requestOfferTypes }) => {
        this.types = requestOfferTypes;
        this.sectors = requestSectors;
        this.status = requestOfferStatus;
      }
    );
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
    this.offerService.findPage(this.pageable, this.offerSearch.status, this.offerSearch.type, this.offerSearch.sector, this.offerSearch.requestedBy, this.offerSearch.managedBy, this.offerSearch.involved, this.offerSearch.startDateModification, this.offerSearch.endDateModification, this.offerSearch.client, this.offerSearch.deliveryDate, this.offerSearch.genAi?.value, this.offerSearch.opportunityWin?.value).subscribe({
      next: (res: OfferPage) => {
        this.offerPage = res;
      },
      error: () => { },
      complete: () => {
        this.offerItemList = this.offerPage.content;
        this.totalElements = this.offerPage.totalElements;
        this.isloading = false;
      },
    });

    this.filterStatus?.map(item => item.id).toString();
  }

  export() {
    this.offerService.findListToExport(this.pageable, this.offerSearch.status, this.offerSearch.type, this.offerSearch.sector, this.offerSearch.requestedBy, this.offerSearch.managedBy, this.offerSearch.involved, this.offerSearch.startDateModification, this.offerSearch.endDateModification, this.offerSearch.client, this.offerSearch.deliveryDate).subscribe({
      next: (res: OfferItemList[]) => {
        this.offerItemListToExport = res;
      },
      error: () => { },
      complete: () => {
        this.exportService.exportOffers(this.offerItemListToExport);
      }
    });
  }

  exportAll() {
    this.isloadingExport = true;
    this.offerService.findDataToExport().subscribe({
      next: (res: OfferDataExportList[]) => {
        this.offerDataToExport = res;
      },
      error: () => {
        this.isloadingExport = false;
      },
      complete: () => {
        this.exportService.exportOfferDataExport(this.offerDataToExport);
        this.isloadingExport = false;
      }
    });
  }

  resizeTable(){
    if(document.getElementById("p-slideMenu")){
      this.tableWidth = 'calc(100vw - 255px)';
    }else{
      this.tableWidth = 'calc(100vw - 55px)';
    }
  }

  toOfferEdit() {
    const ref = this.dinamicDialogService.open(OfferEditComponent, {
      header: this.headerChoice,
      width: '95%',
      height: '90%',
      data: {
        offer: this.selectedOffer,
        readOnly: this.selectedOffer == null ? false : this.canEditOffer(this.selectedOffer) == false
      },
      closable: false,
    });

    ref.onClose.subscribe(() => {
      this.selectedOffer = null;
      this.loadPage();
    });
  }

  onRowSelected(offer: OfferItemList) {
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
        this.headerChoice = 'Editar Oportunidad: ' + this.selectedOffer.name;
        this.toOfferEdit();
      },
    });
  }

  onPriorityChange(offerItemList: OfferItemList) {

    this.offerService.changePriority(offerItemList.id).subscribe({
      next: () => { },
      error: () => { },
      complete: () => {
        this.selectedOffer = null;
        this.loadPage();
      }
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

  isFinishStatus(optionStatus: string): boolean {
    return optionStatus == this.labelInFinish || optionStatus == this.labelInDesestimada;
  }

  searchPerson($event) {
    if ($event.query != null) {
      this.offerService.searchPerson($event.query).subscribe({
        next: (res: Person[]) => {
          this.groupPerson = res.map((person) => this.mappingPerson(person));
        },
        error: () => { },
        complete: () => { },
      });
    }
  }

  getAllOfferStatus() {
    this.offerService.getAllOfferStatus().subscribe({
      next: (res: BaseClass[]) => {
        this.status = res;
      },
      error: () => { },
      complete: () => { },
    });
  }

  mappingPerson(person: Person): any {
    return {
      field: person.name + ' ' + person.lastname,
      value: person,
    };
  }

  transformPerson(person: Person): any {
    if (person != null) return this.mappingPerson(person).field;
  }

  transformYesNo(value: Boolean): any {
    return value ? 'Sí' : 'No';
  }


  transformYesBlank(value: Boolean): any {
    return value ? 'Sí' : '';
  }

  isAssignValuesFilter(): boolean {
    return Object.keys(this.filterForm.value).some(
      (item) => this.filterForm.value[item]
    );
  }

  resetValueForm(formControlName: string) {
    if (formControlName == 'requestedBy') this.offerSearch.requestedBy = null;
    if (formControlName == 'involved') this.offerSearch.involved = null;
    if (formControlName == 'managedBy') this.offerSearch.managedBy = null;
    this.filterForm.get(formControlName).setValue(null);
  }

  resetForm() {
    this.filterForm.reset();
    this.offerSearch = new OfferSearch();
    this.loadPage();
  }

  canEditOffer(offer: Offer): boolean {
    return this.isAdminOrOwner(offer);
  }

  isAdminOrOwner(offer: Offer): boolean {

    if (this.authService.isAdmin()) {
      return true;
    }

    const userRole = 'USER';

    if (offer && offer.managedBy) {
      const selectedManagedByUsername = offer.managedBy.username;
      const currentUserUsername = this.authService.getUserInfo().username;

      return (this.authService.getRoles().includes(userRole) && selectedManagedByUsername === currentUserUsername);
    }
    return false;
  }

}
