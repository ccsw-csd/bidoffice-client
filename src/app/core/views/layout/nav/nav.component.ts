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
    /*
      -- SLIDE MENU --
    this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New', 
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                    {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
                ]
            }
        ];

    */

    this.items = [
      {label: "Ofertas", routerLink: '/main'},
      {label: "Referencias"},
      {
        label: 'Admin', 
        items: [{
                label: 'Tipos de fichero', 
                routerLink: '/admin',
                icon: 'pi pi-fw pi-plus',
            },
        ]  
      },
      {label: "Feedback", url: 'mailto:ccsw.support@capgemini.com?subject=[BidOffice] Consulta / Feedback'},
    ]
    
        /*
    this.items = [
      {label: "Ofertas", routerLink: '/main'},
      {label: "Referencias"},
      {label: "Admin",  routerLink: '/admin' },
      {label: "Feedback", url: 'mailto:ccsw.support@capgemini.com?subject=[BidOffice] Consulta / Feedback'},
    ];
*/

    

    this.utilsService.getAppVersion().subscribe((result: any) => {
      this.backVersion = result.version;
    });
  }

}
