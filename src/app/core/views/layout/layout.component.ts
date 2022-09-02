import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  visibleSideBar = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.authService.registerAccess().subscribe();

    this.activatedRoute.data.subscribe(response => { 
      this.loadDetailedUserInfo(response);
    }); 
  }

  private loadDetailedUserInfo(response: any) : void {

    //No está activado el userResolver
    if (response == null || Object.keys(response).length == 0) return;

    if (response.user == null) {
      this.authService.logout();
      return;
    }

    this.authService.putUserInfoDetailed(response.user); 
  }

  public toggleMenu() : void {
    this.visibleSideBar = !this.visibleSideBar;
  }

}
