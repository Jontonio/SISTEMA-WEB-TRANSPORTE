import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  vista    : boolean = false;
  formLogin: FormGroup;
  loadLogin : boolean = true;
  message  : string;

  constructor(private fbuilder:FormBuilder, 
              private ruta:Router, 
              public _auth:AuthService, 
              private _sp:NgxSpinnerService,
              private _msg:MessagesService) {
    this.formAuth();
    this.userIsLoggin();
  }

  formAuth(){

    this.formLogin = this.fbuilder.group({
      user:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    })

  }

  SingIn(){

    if(this.formLogin.invalid){
      Object.keys(this.formLogin.controls).forEach( input =>{
        this.formLogin.controls[input].markAllAsTouched()
      })
      return;
    }
    
    this._sp.show();
    this._auth.message = 'Ingresando';
    this._auth.loggin(this.formLogin.value.user, this.formLogin.value.password).then( res => {
      if(res) this._sp.hide();
      this._auth.message = 'Cargando';
    }).catch( err => {
      this._sp.hide();
      this._msg.warningMsg(err.message,'Acceso usuario');
    })

  }  

  userIsLoggin(){
    this._auth.seeLoggin().then( res => {
      if(res==true){
        this.ruta.navigateByUrl('panel-admin/dashboard');
      }else{
        this.loadLogin = false;
        this.ruta.navigateByUrl('login');
      }
    }).catch( err =>{ })
  }

}
