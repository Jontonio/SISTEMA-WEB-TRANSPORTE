import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessUserGuard implements CanActivate {

  constructor( private _auth: AuthService, private ruta:Router){

  }

  canActivate(): Promise<boolean>{

    return new Promise( (resolve, reject) => {
      this._auth.isActiveUser().subscribe( res => {
          if(res){ resolve(true); }
          else { 
            this.ruta.navigateByUrl('access-denied');
            resolve(false); 
          }
        }, error => {
          this.ruta.navigateByUrl('login');
          reject(false);
      })

    });
  }
  
}
