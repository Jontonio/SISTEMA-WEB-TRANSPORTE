import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent{

  formPassword:FormGroup;

  constructor(private fb:FormBuilder ,public _auth:AuthService,private _db:DatabaseService, private _msg:MessagesService) {
    this.createdForm();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  createdForm(){
    this.formPassword = this.fb.group({
      pass1:['',[Validators.required]],
      pass2:['',[Validators.required]]
    })
  }

  changePassword(){

    if(this.formPassword.invalid){
      return;
    }

    if(this.formPassword.value.pass1==this.formPassword.value.pass2){
      this._auth.isActiveUser().subscribe( res =>{
        res?.updatePassword(this.formPassword.value.pass2).then( p => {
          this._msg.successMsg('Contraseña cambiada correctamente','Actualizar contraseña')
          this.formPassword.controls['pass1'].setValue('');
          this.formPassword.controls['pass2'].setValue('');
        }).catch( err => {
          this._msg.errorMsg(err.message,'Actualizar contraseña')
        })
      }, err =>{
        console.log(err)
      })
      console.log(this.formPassword.value)
    } else {
      this._msg.warningMsg('Las contraseñas no coinciden','Actualizar contraseña')
    }

  }




}
