import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host: string = "http://localhost:8083/";
  jwt: string
  username: string;
  roles: Array<string>;

  constructor(private http: HttpClient) { }

  onLongin(user) {
    return this.http.post(this.host + 'login', user, { observe: 'response' })
  }
  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objwt = jwtHelper.decodeToken(this.jwt);
    this.username = objwt.sub;
    this.roles = objwt.roles;

  }

  logOut() {
    localStorage.removeItem('token');
    this.initParams();
  }
  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined
  }
}
