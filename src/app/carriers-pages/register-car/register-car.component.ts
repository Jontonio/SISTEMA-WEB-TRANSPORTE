import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'src/app/models/person';
import { ApiService } from 'src/app/services/api.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  isLinear = false; 
  
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  formCar        : FormGroup;
  soyconductor   : string = 'si';
  formCarRegister: FormGroup;
  formDriver     : FormGroup;
  update         : boolean = false;
  dataUpdate     : any;
  updateCar      : boolean = false;
  idUpdateCar    : string;
  idUpdateOwner  : string;
  idOwner        : string;
  loadPerson     : boolean = false;
  existeCar      : boolean = false;

  constructor(public _db:DatabaseService,
    private _formBuilder: FormBuilder, 
              private fb:FormBuilder, 
              private _msg:MessagesService,
              public _trans:TransportService,
              private _api:ApiService, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<RegisterCarComponent>) {
    this.createFormCar();
    this.createFormDriver();
    this.disableInputs();
    this.loadEdit();
  }

  createFormCar(){
    this.formCarRegister = this.fb.group({
      placa:['',[Validators.required, Validators.minLength(7)]],
      serie:['',[Validators.required, Validators.minLength(17)]],
      modelo:['',[Validators.required]],
      color:['',[Validators.required]],
      foto:['',[Validators.required]],
      targetaCirculacion:['',[Validators.required]],
      idEmpresa:['',[Validators.required]],
    })
  }

  createFormDriver(){
    this.formDriver = this.fb.group({
      soyConductor:[this.soyconductor,[Validators.required]],
      valoration: new FormArray([]),
      dniconductor:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^([0-9])*$/)]],
      nombresConductor:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoPaterno:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      apellidoMaterno:['',[Validators.required,Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
      estadoConductor:['',[Validators.required]],
    })
  }
  
  // getters para car
  get placa(){
    return this.formCarRegister.controls['placa'];
  }

  get serie(){
    return this.formCarRegister.controls['serie'];
  }

  get photo(){
    return this.formCarRegister.controls['foto'].invalid && this.formCarRegister.controls['foto'].touched;
  }

  get targeta(){
    return this.formCarRegister.controls['targetaCirculacion'].invalid && this.formCarRegister.controls['targetaCirculacion'].touched;
  }

  // getters para conductor
  get dni(){
    return this.formDriver.controls['dniconductor']
  }
  get nombre(){
    return this.formDriver.controls['nombresConductor']
  }
  get apellidoP(){
    return this.formDriver.controls['apellidoPaterno']
  }
  get apellidoM(){
    return this.formDriver.controls['apellidoMaterno']
  }


  vistaInputs(estado:string){

    this.soyconductor = estado;

    if(this.soyconductor=='si'){
      this.disableInputs();
    }
    if(this.soyconductor=='no'){
      this.enableInputs();
    }
  }

  disableInputs(){
    this.formDriver.controls['dniconductor'].disable();
    this.formDriver.controls['nombresConductor'].disable();
    this.formDriver.controls['apellidoPaterno'].disable();
    this.formDriver.controls['apellidoMaterno'].disable();
    this.formDriver.controls['estadoConductor'].disable();
  }

  enableInputs(){
    this.formDriver.controls['dniconductor'].enable();
    this.formDriver.controls['nombresConductor'].enable();
    this.formDriver.controls['apellidoPaterno'].enable();
    this.formDriver.controls['apellidoMaterno'].enable();
    this.formDriver.controls['estadoConductor'].enable();
  }

  registerCar(){

    this.formCarRegister.value.foto = this._trans.urlCarPhoto;
    this.formCarRegister.value.targetaCirculacion = this._trans.urlCarFile;

    if(this.idOwner){
      const data = {...this.formCarRegister.value, ...this.formDriver.value, 'id':'', 'status':true};
      this._trans.addOnlyCar(this.idOwner, data).then( res => {
        this._msg.successMsg(res as any,'Datos Registrados correctamente');
        this.reset();
      }).catch( err => { 
        this.reset();
        this._msg.errorMsg(err as any,'Error al registrar datos');
      })
    } else {
      const data = {...this.formCarRegister.value, ...this.formDriver.value, 'status':true};
      this._trans.addListCar(data).then( res => {
        if(res){
          this._msg.successMsg('Automóvil añadido a la lista','Automóvil añadido');
          this.dialogRef.close();
        }
      })
    }
  }

  loadEdit(){
    
    if(this.data!=null){
      this.update = true;
      // verificamos si la data es un indice o un objeto
      if(isNaN(this.data)){
        // cargar los datos a actualizar
        this.dataUpdate = this.data;
        this.idUpdateCar = this.data.id;
        this.idUpdateOwner = this.data.idOwner;
        this.updateCar = true;
        if(this.data.new){
          this.idOwner = this.data.idOwner;
          this.update = false;
        }
      }else{
        // cargar los datos a actualizar
        this.dataUpdate = this._trans.listCarOwner[this.data] as any;
      }

      this.formCarRegister.controls['placa'].setValue(this.dataUpdate.placa);
      this.formCarRegister.controls['serie'].setValue(this.dataUpdate.serie);
      this.formCarRegister.controls['modelo'].setValue(this.dataUpdate.modelo);
      this.formCarRegister.controls['color'].setValue(this.dataUpdate.color);
      this.formCarRegister.controls['idEmpresa'].setValue(this.dataUpdate.idEmpresa);
      
      if(this.dataUpdate.soyConductor=='no'){
        this.enableInputs();
        this.formDriver.controls['soyConductor'].setValue(this.dataUpdate.soyConductor);
        this.formDriver.controls['dniconductor'].setValue(this.dataUpdate.dniconductor);
        this.formDriver.controls['nombresConductor'].setValue(this.dataUpdate.nombresConductor);
        this.formDriver.controls['apellidoPaterno'].setValue(this.dataUpdate.apellidoPaterno);
        this.formDriver.controls['apellidoMaterno'].setValue(this.dataUpdate.apellidoMaterno);
        this.formDriver.controls['estadoConductor'].setValue(this.dataUpdate.estadoConductor);
      }

      // desactiva los campos obligatorios del crearFormulario
      this.formCarRegister.controls['foto'].clearValidators();
      this.formCarRegister.controls['foto'].updateValueAndValidity();
      this.formCarRegister.controls['targetaCirculacion'].clearValidators();
      this.formCarRegister.controls['targetaCirculacion'].updateValueAndValidity();

      // // inicializamos los campos file
      this.formCarRegister.value.foto = this.dataUpdate.foto;
      this.formCarRegister.value.targetaCirculacion = this.dataUpdate.targetaCirculacion;
    }
  }

  saveToList(){

    if(this.formCarRegister.value.foto){
      this.formCarRegister.value.foto = this._trans.urlCarPhoto;
    }else{
      this.formCarRegister.value.foto = this.dataUpdate.foto;
    }
    if(this.formCarRegister.value.targetaCirculacion){
      this.formCarRegister.value.targetaCirculacion = this._trans.urlCarFile;
    }else{
      this.formCarRegister.value.targetaCirculacion = this.dataUpdate.targetaCirculacion;
    }

    const data = {...this.formCarRegister.value, ...this.formDriver.value};

    if(this.updateCar){

      this._trans.updateCar(this.idUpdateOwner, this.idUpdateCar, data).then( res => {
        this._msg.successMsg(res as any,'Datos actualizado correctamente');
        this.reset();
      }).catch( err =>{
        this.reset();
        this._msg.warningMsg(err,'Error al actualizar datos')
      })

    } else {
      this._trans.listCarOwner.splice(this.data, 1, data);
      this._msg.successMsg('Automóvil actualizado correctamente','Automóvil actualizado');
      this.dialogRef.close();
    }

  }

  dataPerson(){

    if(this.formDriver.controls['dniconductor'].valid){
      this.loadPerson = true;
      const dni = this.formDriver.value.dniconductor;
      this._api.person(dni).then( res => {
        this.completeData(res as Person);
        this.loadPerson = false;
      }).catch( err => {
        this.loadPerson = false;
        this._msg.errorMsg(err,'Error api 504')
      })

    }
  }

  completeData(person:Person){
    this.formDriver.controls['nombresConductor'].setValue(person.nombres);
    this.formDriver.controls['apellidoPaterno'].setValue(person.apellidoPaterno);
    this.formDriver.controls['apellidoMaterno'].setValue(person.apellidoMaterno);
  }
  
  validateNext1(){
    if(this.formCarRegister.invalid){
      Object.keys(this.formCarRegister.controls).forEach( input => {
        this.formCarRegister.controls[input].markAllAsTouched();
      })
      return;
    }
  }

  validateNext2(){
    if(this.formDriver.invalid){
      Object.keys(this.formDriver.controls).forEach( input => {
        this.formDriver.controls[input].markAllAsTouched();
      })
      return;
    }
  }

  reset(){
    this.update = false;
    this.dataUpdate = '';
    this.updateCar = false;
    this.idUpdateCar = '';
    this.idUpdateOwner = '';
    this.idOwner = '';
  }

  searchCar(event:Event){
    if(this.formCarRegister.controls['placa'].valid){
      const placa = this.formCarRegister.value.placa;
      if(this._trans.findCar(placa)!=-1){
        this.existeCar = true;
        this._msg.warningMsg('Registre otro vehículo',`El vehículo con la placa ${placa} esta registrado`)
      } else {
        this.existeCar = false
      }
    }
  }

}
