import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserDto} from '../../../common/user-dto';
import {JwtHelperService} from '@auth0/angular-jwt';

// @ts-ignore
@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  jwt: string = '';
  username: string = '';
  roles: Array<String> = [];

  constructor(private router: Router) {
  }

  setAccessToken(token: any): void {
    localStorage.setItem('accessToken', token);
    this.jwt = token;
  }


  parseJWT(): any {
    const jwt = localStorage.getItem('accessToken');
    if (jwt !== null) {
    const jwtHelper = new JwtHelperService();

    const objJwt = jwtHelper.decodeToken(jwt);


    return objJwt;}
  }

  loadToken(): boolean {
    const jwt = localStorage.getItem('accessToken');
    if (jwt !== null) {
      return true;

    }
    return false;
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.initParams;
  }

  initParams() {
    this.jwt = '';
    this.username = '';
    this.roles = [];
  }


 /*userHasRoleAdmin(): boolean {
    const token = localStorage.getItem('accessToken');
    const user = this.parseJWT();
    console.log(user)


      return true;
    }
    return false;
  }
  userHasRoleMaster(): boolean {
    const token = localStorage.getItem('accessToken');
    const user = this.parseJWT();
    console.log(user)
    if (user.isMaster) {

      return true;
    }
    return false;
  }*/


  parseForLogin(jwt:any){

    const jwtHelper = new JwtHelperService();
    // @ts-ignore
    const objJwt = jwtHelper.decodeToken(jwt);
    return objJwt;
  }
loggedIn(){
    return !!localStorage.getItem('accessToken');

}




 getToken(): String {
    const jwt = localStorage.getItem('accessToken');
    if (jwt !== null) {
      return jwt;

    }else{
      // @ts-ignore
      return jwt;

    }
  }
}
