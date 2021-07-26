import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessAdminGuard implements CanActivate {

  constructor(private _auth:AuthService){}

  canActivate( route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(this._auth.userActive.type_profile=='root'){
        return true;
      }
      return false;
  }
  
}
