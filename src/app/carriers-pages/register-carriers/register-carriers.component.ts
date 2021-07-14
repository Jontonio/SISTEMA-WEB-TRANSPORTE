import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Owner } from 'src/app/models/owner';
import { Person } from 'src/app/models/person';
import { ApiService } from 'src/app/services/api.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { TransportService } from 'src/app/services/transport.service';
import { RegisterCarComponent } from '../register-car/register-car.component';

@Component({
  selector: 'app-register-carriers',
  templateUrl: './register-carriers.component.html',
  styleUrls: ['./register-carriers.component.css']
})
export class RegisterCarriersComponent {

  @ViewChild('avatar',{static:false}) avatar:ElementRef;

  formMain   :FormGroup;
  loadComlete: boolean = false;
  urlPhotoOwner: string = '';
  registerLoad: boolean = false;

  constructor(private dialog:MatDialog, 
              private fb:FormBuilder, 
              public _trans:TransportService, 
              public _db:DatabaseService,
              private _msg:MessagesService,
              private _api:ApiService) { 
    this.formCarriers();
  }

  openRegisterCar(){
    this.dialog.open(RegisterCarComponent, { width:'100%', disableClose:true })
  }

  formCarriers(){
    this.formMain = this.fb.group({
      id:[''],
      ID_card: ['', [Validators.required,Validators.minLength(8),Validators.pattern(/^([0-9])*$/)]],         
      first_name: ['', [Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],      
      father_last_name:['' ,[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      mother_last_name:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      URL_photo: ['', [Validators.required]],       
      celphone: ['', [Validators.required,Validators.minLength(9),Validators.pattern(/^([0-9])*$/)]],        
      email: ['', [Validators.required, Validators.email]]         
    })
  }

  get id_card(){
    return this.formMain.controls['ID_card'];
  }
  get first_name(){
    return this.formMain.controls['first_name'];
  }
  get father_ln(){
    return this.formMain.controls['father_last_name'];
  }
  get mother_ln(){
    return this.formMain.controls['mother_last_name'];
  }
  get photo(){
    return this.formMain.controls['URL_photo'].invalid && this.formMain.controls['URL_photo'].touched;
  }
  get celphone(){
    return this.formMain.controls['celphone'];
  }
  get email(){
    return this.formMain.controls['email'];
  }


  registerOwner(){
    
    if(this.formMain.invalid){
      Object.keys(this.formMain.controls).forEach( input => {
        this.formMain.controls[input].markAllAsTouched();
      })
      return;
    } else if(this._trans.listCarOwner.length==0){
      this._msg.warningMsg('Registre al menos un vehículo para guardar al conductor','Registre un vehiculo');
      return;
    } 

    this.registerLoad = true;
    const data = new Owner(this.formMain.value.ID_card, 
                          this.formMain.value.first_name, 
                          this.formMain.value.father_last_name,
                          this.formMain.value.mother_last_name,
                          this._db.imgauxPost,
                          this.formMain.value.celphone,
                          this.formMain.value.email,
                          this._trans.listCarOwner);

    this._trans.addCarrier(data.toObject).then( res => {
      this._msg.successMsg(res as any,'Registro de transportista');
      this.registerLoad = false;
      this.resetForm();
    }).catch( err => {
      this.registerLoad = false;
      this._msg.errorMsg(err,'Error');
    })

  }

  completeData(){
    if(this.formMain.controls['ID_card'].valid){
      const idcard = this.formMain.value.ID_card;
      let person = new Person();
      this.loadComlete = true;
      this._api.person(idcard).then( res => {
        this.loadComlete = false;
        person = res as Person;
        if(person.dni){
          this.formMain.controls['first_name'].setValue(person.nombres)
          this.formMain.controls['father_last_name'].setValue(person.apellidoPaterno)
          this.formMain.controls['mother_last_name'].setValue(person.apellidoMaterno)
          this.formMain.controls['email'].setValue(`${person.nombres.toLowerCase().replace(' ','')}${person.apellidoPaterno.toLowerCase()}@mail.com`)
        } else {
          this._msg.warningMsg('Persona no encotrada en RENIEC', 'Warning API data dni');
          this.loadComlete = false;
        }
      }).catch( err => {
        this.loadComlete = false;
        this._msg.errorMsg(err, 'Error API data dni');
      })

    }
  }

  editCar(indice:number) {
    this.dialog.open(RegisterCarComponent,{ width:'100%', disableClose:true, data: indice});
  }

  resetForm(){
    this.formMain.reset();
    this._db.imgauxPost = '';
    this._trans.listCarOwner = [];
  }

  
  // const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"];


}
