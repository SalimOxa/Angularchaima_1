import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserStoreService} from '../../../authentication/stores/user-store/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuardGuard implements CanActivate {
  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isTokenValid = this.userStoreService.loggedIn();
    if (!isTokenValid) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['dashboard']);
    }
    return isTokenValid;

  }

}

