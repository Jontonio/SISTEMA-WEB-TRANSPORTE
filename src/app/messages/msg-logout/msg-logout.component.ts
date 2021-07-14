import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-msg-logout',
  templateUrl: './msg-logout.component.html',
  styleUrls: ['./msg-logout.component.css']
})
export class MsgLogoutComponent implements OnInit {

  constructor( private _auth: AuthService, private ruta:Router) { }

  ngOnInit(): void {

  }

  salir(){
    this._auth.logout().then( res => {
      console.log(res);
      this.ruta.navigateByUrl('login');
    }).catch( err =>{
      console.log(err);
    })
  }

}
