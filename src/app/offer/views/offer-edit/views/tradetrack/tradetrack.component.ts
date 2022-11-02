import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { Offer } from 'src/app/offer/model/Offer';
import { OfferTradeTracking } from 'src/app/offer/model/OfferTradeTracking';
import { Person } from 'src/app/offer/model/Person';
import { OfferService } from 'src/app/offer/services/offer.service';
import { TradetrackEditComponent } from './tradetrack-edit/tradetrack-edit.component';

@Component({
  selector: 'app-tradetrack',
  templateUrl: './tradetrack.component.html',
  styleUrls: ['./tradetrack.component.scss'],
})
export class TradetrackComponent implements OnInit {
  isEditing = false;
  clonedOfferTradeTracking: OfferTradeTracking;
  @Input() data: Offer;
  @ViewChild('table') table: Table;

  constructor(
    private dinamicDialogService: DialogService,
    public auth: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  createtradeTracking() {
    const ref = this.dinamicDialogService.open(TradetrackEditComponent, {
      header: 'Crear nuevo seguimiento',
      width: '30%',
      data: this.clonedOfferTradeTracking,
      closable: false,
    });

    ref.onClose.subscribe((trade: OfferTradeTracking) => {
      if (trade != null && trade.uuid != null) {
        let index = this.data.tradeTrackings.findIndex(
          (item) => item.uuid == trade.uuid
        );
        if (index != -1) {
          this.data.tradeTrackings[index] = trade;
          this.table.value[
            this.table.value.findIndex((item) => item.uuid == trade.uuid)
          ] = trade;
        } else {
          this.data.tradeTrackings.push(trade);
          if (this.isAscendig(this.table.value)) this.table.value.push(trade);
          else this.table.value.unshift(trade);
        }

        delete this.clonedOfferTradeTracking;
      }
    });
  }

  onRowEditInit(trade: OfferTradeTracking) {
    this.clonedOfferTradeTracking = { ...trade };
    this.createtradeTracking();
  }

  transformPerson(person: Person) {
    return person.name + ' ' + person.lastname + ' - ' + person.username;
  }

  commentFromCurrentPerson(person: Person): boolean {
    return this.auth.getUserInfo().username == person.username;
  }

  onDeleteRow(trade: OfferTradeTracking) {
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Esta seguro que desea eliminar este registro?',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-secondary',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        if (trade.uuid != null)
          this.data.tradeTrackings = this.data.tradeTrackings.filter(
            (item) => item.uuid != trade.uuid
          );
      },
      reject: () => {},
    });
  }

  isAscendig(arry: OfferTradeTracking[]): boolean {
    return arry.every((b, i, { [i - 1]: a }) => !i || a.date <= b.date);
  }
}
