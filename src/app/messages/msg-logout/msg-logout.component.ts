import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-msg-logout',
  templateUrl: './msg-logout.component.html',
  styleUrls: ['./msg-logout.component.css']
})
export class MsgLogoutComponent implements OnInit {

  constructor( private _auth: AuthService, private ruta:Router, public _theme:ThemeService) { }

  ngOnInit(): void {

  }

  salir(){
    this._auth.logout().then( res => {
      this.ruta.navigateByUrl('login');
    }).catch( err =>{
      console.log(err);
    })
  }

}
