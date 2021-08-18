import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  formUser: FormGroup;
  porcentajeSubidaFoto: number;
  loadregister: boolean = false;
  idUpdate: string | null; 
  update  : boolean = false;
  loadPerson: boolean = false;



  constructor( private fb: FormBuilder, 
               private rutaActive: ActivatedRoute,
               private ruta:Router, 
               public _db:DatabaseService, 
               private _msg:MessagesService,
               private _auth:AuthService,
               private _api:ApiService,
               public _theme:ThemeService) { 
    this.createForm();
    this.verifyUpdate();
  }

  createForm(){
    this.formUser = this.fb.group({
      ID_card: ['', [Validators.required,Validators.minLength(8),Validators.pattern(/^([0-9])*$/)]],         
      firts_name: ['', [Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],      
      father_last_name:['' ,[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      mother_last_name:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      type_profile: ['', [Validators.required]],    
      URL_photo: [''],       
      celphone: ['', [Validators.required,Validators.minLength(9),Validators.pattern(/^([0-9])*$/)]],        
      user: ['', [Validators.required, Validators.email]]            
    })
  }

  get dni(){
    return this.formUser.controls['ID_card'];
  }
  get name(){
    return this.formUser.controls['firts_name'];
  }
  get flastName(){
    return this.formUser.controls['father_last_name'];
  }
  get mlastName(){
    return this.formUser.controls['mother_last_name'];
  }
  get tProfile(){
    return this.formUser.controls['type_profile'];
  }
  get phone(){
    return this.formUser.controls['celphone'];
  }

  verifyUpdate(){
    if(this.rutaActive.snapshot.paramMap.get('id')){
      this.idUpdate = this.rutaActive.snapshot.paramMap.get('id');
      this.update = true;
      this._db.getOneUser(this.idUpdate as any).then( res => {
        this.loadFormUpdate(res as User)
      }).catch( err =>{
        console.log(err)
      })
    }else{
      this._db.imgURL = "assets/img/img-user/default-user.png";
    }
  }

  registerUser(){

    if(this.formUser.invalid){
        Object.keys(this.formUser.controls).forEach( input =>{
          this.formUser.controls[input].markAllAsTouched()
        })
        return;
    }
    this.loadregister = true; 
    const usuario = new User(this.formUser.value.ID_card,
                            this.formUser.value.firts_name,
                            this.formUser.value.father_last_name,
                            this.formUser.value.mother_last_name,
                            this.formUser.value.user,
                            this._db.imgURL,
                            this.formUser.value.celphone,
                            this.formUser.value.type_profile);
    this._db.addUser(usuario).then( res => {
      this._db.imgURL = "assets/img/img-user/default-user.png";
      this.formUser.reset();
      this._auth.createUserAPI(usuario).then( res =>{
        this._msg.successMsg(res as any,'Registro usuario');
        this.loadregister = false;
      }).catch( err => {
        this.loadregister = false;
        this._msg.errorMsg(err as any,'Registro usuario')
      })
    }).catch( err =>{
      console.log(err)
    })
  }

  loadFormUpdate(data:User){
    this.formUser.controls['ID_card'].setValue(data.ID_card);
    this.formUser.controls['firts_name'].setValue(data.firts_name);
    this.formUser.controls['father_last_name'].setValue(data.father_last_name);
    this.formUser.controls['mother_last_name'].setValue(data.mother_last_name);
    this.formUser.controls['type_profile'].setValue(data.type_profile);
    this._db.imgURL = data.URL_photo;
    //this.formUser.controls['URL_photo'].setValue(data.URL_photo);
    this.formUser.controls['celphone'].setValue(data.celphone);
    this.formUser.controls['user'].setValue(data.user);
        
    if(this._auth.userActive.type_profile=='normal'){
      this.formUser.controls['type_profile'].disable();
    }

  }
  
  updateUser(){
    this.formUser.addControl('id',new FormControl);
    this.formUser.controls['id'].setValue(this.idUpdate);
    this.formUser.controls['URL_photo'].setValue(this._db.imgURL);
    
    this._db.updateUser(this.formUser.value).then( res =>{
      this._msg.successMsg(res as any,'Actualizar usuario');
      this.ruta.navigate(['panel-admin/users'])
    }, err => {
      this._msg.errorMsg(err.message as any,'Actualizar usuario');
    })
  }

  dataPerson(){
    if(this.formUser.controls['ID_card'].valid){
      const dni = this.formUser.value.ID_card;
      this.loadPerson = true;
      this._api.person(dni).then( res => {
        this.loadPerson = false;
        this.completeData(res as Person);
      }).catch( err => {
        this.loadPerson = false;
        this._msg.errorMsg(err,'Error api 504')
      })
    }
  }

  completeData(person:Person){
    this.formUser.controls['firts_name'].setValue(person.nombres);
    this.formUser.controls['father_last_name'].setValue(person.apellidoPaterno);
    this.formUser.controls['mother_last_name'].setValue(person.apellidoMaterno);
  }

}
