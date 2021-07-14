import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  formrecovery:FormGroup;
  viewFormpass:boolean = true;

  constructor(private fb:FormBuilder, private _auth:AuthService, private _msg:MessagesService) { 
    this.createFormRecovery();
  }

  ngOnInit(): void {
  }

  createFormRecovery(){
    this.formrecovery = this.fb.group({
      email:['', [Validators.required, Validators.email]]
    })
  }

  get email(){
    return this.formrecovery.controls['email'];
  }

  recovery(){
    if(this.formrecovery.invalid){
      Object.keys(this.formrecovery.controls).forEach( input =>{
        this.formrecovery.controls[input].markAllAsTouched()
      })
      return;
    }
    this._auth.resetPassword(this.formrecovery.value.email).then( res => {
      this.viewFormpass = false;
    }).catch( err => {
      this._msg.errorMsg(err.message as any,'Error al reset contraseña')
    })
  }

}
