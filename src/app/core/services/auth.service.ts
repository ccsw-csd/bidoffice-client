import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResponseCredentials } from '../models/ResponseCredentials';
import { UserInfoDetailed } from '../models/UserInfoDetailed';
import { UserInfoSSO } from '../models/UserInfoSSO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ssoCredentialsKey : string = 'ssoCredentials';
  ssoToken : string = null;

  userInfoSSO: UserInfoSSO | null = null;
  userInfoDetailed: UserInfoDetailed | null = null;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient,
  ) { }


  // *************************** //
  // **     AUTHENTICATION    ** //
  // *************************** //


  public putSSOCredentials(res: ResponseCredentials) : void {
    this.ssoToken = res.token;
    localStorage.setItem(this.ssoCredentialsKey, this.ssoToken);
  }

  public getSSOToken(): string | null {

    if (this.ssoToken == null) {
      this.ssoToken = localStorage.getItem(this.ssoCredentialsKey);
    }


    return this.ssoToken;
  }

  

  // *************************** //
  // **       LOGOUT          ** //
  // *************************** //

  public logout() {
    this.clearCredentials();
    this.router.navigateByUrl('login');
  }


  public clearCredentials() {
    localStorage.removeItem(this.ssoCredentialsKey);

    this.ssoToken = null;    
    this.userInfoDetailed = null;
    this.userInfoSSO = null;
  }  
    
  // *************************** //
  // **        UTILS          ** //
  // *************************** //


  isTokenValid() : boolean {
    let token = this.getSSOToken();
    if (token == null) return false;
  
    try {

      let expired = this.jwtHelper.isTokenExpired(token);
      if (expired) return false;
      
      let roles = this.getRoles();
      if (roles == null || roles.length == 0) return false;
      
      
      return true;
    }
    catch {
      return false;
    }
  }
  


  public getUserInfo() : UserInfoSSO {

    if (this.userInfoSSO == null) {
      let data = this.jwtHelper.decodeToken(this.getSSOToken());
      if (data == null) return null;

      this.userInfoSSO = {
        displayName: data.displayName,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        officeName: data.officeName,
        username: data.sub,
        saga: data.saga,
        grade: data.grade,
        roles: data.roles
      };

    }

    return this.userInfoSSO;

  }

  public getRoles(): String[] {
    let userInfo = this.getUserInfo();
    return userInfo.roles[environment.appCode];
  }

  public putUserInfoDetailed(userDetailed: UserInfoDetailed) {
    this.userInfoDetailed = userDetailed;
  }

  public getUserInfoDetailed() : UserInfoDetailed | null {
    return this.userInfoDetailed;
  }  

  public registerAccess(): Observable<void> {

    if (environment.production)
      return this.http.get<void>(environment.sso + '/register-access/'+environment.appCode);
    else
      return of();
  }  

}
