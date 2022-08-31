import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bidoffice-client';

  constructor(private translateService: TranslateService, private config: PrimeNGConfig){}

  ngOnInit(): void {
    this.translateService.setDefaultLang('es');
    this.translateService.get('calendar').subscribe(res => this.config.setTranslation(res));
  
  }
}
