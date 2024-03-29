import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/core/services/utils.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  frontVersion : string = "1.0.0";
  backVersion : string = "1.0.0";
  items: MenuItem[];

  constructor(
    public authService: AuthService,
    public dialogService: DialogService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {

    this.items = [
      {label: "Oportunidades", routerLink: '/main'},
      {label: "Administración",
        expanded: true,
        visible: this.authService.hasRole('ADMIN'),
        items: [
          {label: "Tipos de ficheros",  routerLink: "/filetype"},
          {label: 'Hyperscaler', routerLink: '/hyperscaler'},
          {label: "Metodologías", routerLink: '/methodology'},
          {label: "Tecnologías", routerLink: '/technology'},
          {label: "Tipos de oportunidad", routerLink: '/opportunitytype'},
          {label: "Offering", routerLink: '/offering'},
          {label: "Tipos de proyecto", routerLink: '/projecttype'},
          {label: "Sectores", routerLink: '/sector'},
          {label: "Formatos de documento", routerLink: '/formatdocument'}
        ]
      }
    ];

    this.utilsService.getAppVersion().subscribe((result: any) => {
      this.backVersion = result.version;
    });
  }

}
