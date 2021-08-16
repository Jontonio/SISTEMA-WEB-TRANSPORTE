import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Owner } from 'src/app/models/owner';
import { Person } from 'src/app/models/person';
import { ApiService } from 'src/app/services/api.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TransportService } from 'src/app/services/transport.service';
import { RegisterCarComponent } from '../register-car/register-car.component';

@Component({
  selector: 'app-register-carriers',
  templateUrl: './register-carriers.component.html',
  styleUrls: ['./register-carriers.component.css']
})
export class RegisterCarriersComponent {

  @ViewChild('avatar',{static:false}) avatar:ElementRef;

  formMain     :FormGroup;
  loadComlete  : boolean = false;
  urlPhotoOwner: string = '';
  registerLoad : boolean = false;
  updateData   : boolean = false
  idUpdate     :string

  constructor(private dialog:MatDialog, 
              private rutaActiva:ActivatedRoute,
              private fb:FormBuilder, 
              public _trans:TransportService, 
              public _db:DatabaseService,
              public _theme:ThemeService,
              private _msg:MessagesService,
              public _api:ApiService) { 
    this.formCarriers();
    this.dataEdit();
  }

  dataEdit(){
    // verificar si viene id para actualizar
    if(this.rutaActiva.snapshot.paramMap.get('id')){
      this.idUpdate = this.rutaActiva.snapshot.paramMap.get('id') as any;
      this.updateData = true;
      this._trans.getCarrier(this.idUpdate).then( res => {
        this.compleForm(res as any);
      }).catch( err => {
        this._msg.errorMsg(err, 'Error get data');
      })
    } else {
      // en caso que no venga id, inicializar imgAux en vacio
      this._db.imgauxPost = '';
      this._trans.listCarOwner = [];
    }
  }

  openRegisterCar(){
    // abrir componente register carrier modal
    this.dialog.open(RegisterCarComponent, { width:'100%',panelClass:'description-modal' })
  }

  formCarriers(){
    // creación de modelo formulario
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

  compleForm(data:Owner){
    // completar formulario para actualizar
    this.formMain.controls['id'].setValue(data.id)
    this.formMain.controls['ID_card'].setValue(data.ID_card)         
    this.formMain.controls['first_name'].setValue(data.firts_name)     
    this.formMain.controls['father_last_name'].setValue(data.father_last_name)
    this.formMain.controls['mother_last_name'].setValue(data.mother_last_name)
    this.formMain.controls['email'].setValue(data.email) 
    this.formMain.controls['celphone'].setValue(data.celphone) 
    // aquí eliminamos los validadores para el campo foto
    this.formMain.controls['URL_photo'].clearValidators();
    this.formMain.controls['URL_photo'].updateValueAndValidity();
    // mostrar la foto actual    
    this._db.imgauxPost = data.URL_photo;
    // cargar lista de arreglos
    this._trans.getCarrierCars(data.id).then( res => {
      this._trans.listCarOwner = res as any;
    }).catch( err => {
      this._msg.errorMsg(err,'Error al obtener vehículos');
    })
  }

  // metodos get para simplicar la validación de datos
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
    // verificación si el formulario es correcto
    if(this.formMain.invalid){
      Object.keys(this.formMain.controls).forEach( input => {
        this.formMain.controls[input].markAllAsTouched();
      })
      return;
    } else if(this._trans.listCarOwner.length==0){
      this._msg.warningMsg('Registre al menos un vehículo para guardar al conductor','Registre un vehiculo');
      return;
    } 
    
    // creamos el objeto data 
    const data = new Owner(this.formMain.value.ID_card, 
      this.formMain.value.first_name, 
      this.formMain.value.father_last_name,
      this.formMain.value.mother_last_name,
      this._db.imgauxPost,
      this.formMain.value.celphone,
      this.formMain.value.email);

    // validamos si es para actualizar la data o registrar
    if(this.updateData){
      data.setId(this.idUpdate);
      //console.log(data, this._trans.listCarOwner)
      this.registerLoad = true;
      this._trans.updateCarrier(data.toObject).then( res =>{
        this._msg.successMsg(res as any,'Actualizar datos')
        this.registerLoad = false;
      }).catch( err =>{
        this.registerLoad = false;
        this._msg.errorMsg(err,'Ocurrio un error')
      })
    } else {
      // console.log(data.toObject,this._trans.listCarOwner)
      // caso que pase la validación crear un obejto dueño 
      this._trans.findTransportista(this.formMain.value.ID_card).then( res => {
        if(!res){
          this.registerLoad = true;
          this._trans.addCarrier(data.toObject,this._trans.listCarOwner).then( res => {
            this._msg.successMsg(res as any,'Registro de transportista');
            this.registerLoad = false;
            this.resetForm();
          }).catch( err => {
            this.registerLoad = false;
            this._msg.errorMsg(err,'Error');
          })
        } else {
          this._msg.warningMsg(`El transportista con DNI ${this.formMain.value.ID_card} ya esta registrado`,'Registre otro transportista') 
        }
      })
    }

  }

  // metodo para completar data mediante api Perú
  completeData(){
    // verificamos si el campo idcard esta compelto y válido
    if(this.formMain.controls['ID_card'].valid){
      const idcard = this.formMain.value.ID_card;
      this._trans.findTransportista(this.formMain.value.ID_card).then( res => {
        if(!res){
          let person = new Person();
          this.loadComlete = true;
          this._api.person(idcard).then( res => {
            this.loadComlete = false;
            person = res as Person;
            // si dni existe, entonces existe toda la data
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
        } else {
          this._msg.warningMsg(`El transportista con DNI ${this.formMain.value.ID_card} ya esta registrado`,'Registre otro transportista') 
        }
      })
    }
  }

  editCar(indice:number) {
    this.dialog.open(RegisterCarComponent,{ width:'100%', data: indice, panelClass:'description-modal'});
  }

  resetForm(){
    this.formMain.reset();
    this._db.imgauxPost = '';
  }


}
