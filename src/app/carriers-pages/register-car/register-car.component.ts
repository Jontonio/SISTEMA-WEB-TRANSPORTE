import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/models/Car';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';
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

  formCar:FormGroup;
  soyconductor: string = 'si';
  update: boolean = false;
  formCarRegister: FormGroup;
  formDriver:FormGroup;

  constructor(public _db:DatabaseService,
    private _formBuilder: FormBuilder, 
              private fb:FormBuilder, 
              private _msg:MessagesService,
              private _trans:TransportService, 
              @Inject(MAT_DIALOG_DATA) public data: number,
              public dialogRef: MatDialogRef<RegisterCarComponent>) {
    this.createFormCar();
    this.createFormDriver();
    this.disableInputs();
    this.loadEdit();
  }

  createFormCar(){
    this.formCarRegister = this.fb.group({
      placa:['',[Validators.required]],
      serie:['',[Validators.required]],
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
      dniconductor:['',[Validators.required]],
      nombresConductor:['',[Validators.required]],
      apellidoPaterno:['',[Validators.required]],
      apellidoMaterno:['',[Validators.required]],
      estadoConductor:['',[Validators.required]],
    })
  }

  get photo(){
    return this.formCarRegister.controls['foto'].invalid && this.formCarRegister.controls['foto'].touched;
  }
  get targeta(){
    return this.formCarRegister.controls['targetaCirculacion'].invalid && this.formCarRegister.controls['targetaCirculacion'].touched;
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
    const data = {...this.formCarRegister.value, ...this.formDriver.value};
    this._trans.addListCar(data).then( res => {
      if(res){
        this._msg.successMsg('Automóvil añadido a la lista','Automóvil añadido');
        this.dialogRef.close();
      }
    })
  }

  loadEdit(){
    if(this.data!=null){
      this.update = true;
      const value = this._trans.listCarOwner[this.data] as Car;
      this.formCarRegister.controls['placa'].setValue(value.placa);
      this.formCarRegister.controls['serie'].setValue(value.serie);
      this.formCarRegister.controls['modelo'].setValue(value.modelo);
      this.formCarRegister.controls['color'].setValue(value.color);
      this.formCarRegister.controls['foto'].setValue(value.fotoConductor);
      this.formCarRegister.controls['idEmpresa'].setValue(value.idEmpresa);
      
      if(value.soyConductor=='no'){
        this.enableInputs();
        this.formDriver.controls['soyConductor'].setValue(value.soyConductor);
        this.formDriver.controls['dniconductor'].setValue(value.dniconductor);
        this.formDriver.controls['nombresConductor'].setValue(value.nombresConductor);
        this.formDriver.controls['apellidoPaterno'].setValue(value.apellidoPaterno);
        this.formDriver.controls['apellidoMaterno'].setValue(value.apellidoMaterno);
        this.formDriver.controls['estadoConductor'].setValue(value.estadoConductor);
      }
    }
  }

  saveToList(){
    const data = {...this.formCarRegister.value, ...this.formDriver.value};
    this._trans.listCarOwner.splice(this.data, 1, data);
    this._msg.successMsg('Automóvil actualizado correctamente','Automóvil actualizado');
    this.dialogRef.close();
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

}
