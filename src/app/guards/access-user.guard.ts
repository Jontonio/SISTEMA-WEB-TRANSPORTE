import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class AccessUserGuard implements CanActivate {

  constructor( private _auth: AuthService, private ruta:Router, private _db:DatabaseService){

  }

  canActivate(): Promise<boolean>{

    return new Promise( (resolve, reject) => {
      this._auth.isActiveUser().subscribe( res => {
          if(res){ 
            this._db.Userdb(res.email as any).then ( resDB => {
              if(resDB){
                resolve(resDB as boolean); 
              }else {
                this.ruta.navigateByUrl('login');
                resolve(false); 
              }
            })
          }
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
