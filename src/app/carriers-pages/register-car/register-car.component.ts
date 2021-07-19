import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/models/Car';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent {

  formCar:FormGroup;
  soyconductor: string = 'si';
  update: boolean = false;

  constructor(public _db:DatabaseService, 
              private fb:FormBuilder, 
              private _msg:MessagesService,
              private _trans:TransportService, 
              @Inject(MAT_DIALOG_DATA) public data: number,
              public dialogRef: MatDialogRef<RegisterCarComponent>) {
    this.createForm();
    this.disableInputs();
    this.loadEdit();
  }

  createForm(){
    this.formCar = this.fb.group({
      placa:['',[Validators.required]],
      serie:['',[Validators.required]],
      modelo:['',[Validators.required]],
      color:['',[Validators.required]],
      foto:['',[Validators.required]],
      idEmpresa:['',[Validators.required]],
      soyConductor:[this.soyconductor,[Validators.required]],
      valoration: new FormArray([]),
      dniconductor:['',[Validators.required]],
      nombresConductor:['',[Validators.required]],
      apellidoPaterno:['',[Validators.required]],
      apellidoMaterno:['',[Validators.required]],
      estadoConductor:['',[Validators.required]],
      targetaCirculacion:['',[Validators.required]]
    })
  }

  get photo(){
    return this.formCar.controls['foto'].invalid && this.formCar.controls['foto'].touched;
  }
  get targeta(){
    return this.formCar.controls['targetaCirculacion'].invalid && this.formCar.controls['targetaCirculacion'].touched;
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
    this.formCar.controls['dniconductor'].disable();
    this.formCar.controls['nombresConductor'].disable();
    this.formCar.controls['apellidoPaterno'].disable();
    this.formCar.controls['apellidoMaterno'].disable();
    this.formCar.controls['estadoConductor'].disable();
  }

  enableInputs(){
    this.formCar.controls['dniconductor'].enable();
    this.formCar.controls['nombresConductor'].enable();
    this.formCar.controls['apellidoPaterno'].enable();
    this.formCar.controls['apellidoMaterno'].enable();
    this.formCar.controls['estadoConductor'].enable();
  }

  registerCar(){

    if(this.formCar.invalid){
      Object.keys(this.formCar.controls).forEach( input => {
        this.formCar.controls[input].markAllAsTouched();
      })
      return;
    }

    this._trans.addListCar(this.formCar.value).then( res => {
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
      this.formCar.controls['placa'].setValue(value.placa);
      this.formCar.controls['serie'].setValue(value.serie);
      this.formCar.controls['modelo'].setValue(value.modelo);
      this.formCar.controls['color'].setValue(value.color);
      this.formCar.controls['foto'].setValue(value.fotoConductor);
      this.formCar.controls['idEmpresa'].setValue(value.idEmpresa);
      this.formCar.controls['soyConductor'].setValue(value.soyConductor);

      if(value.soyConductor=='no'){
        this.enableInputs();
        this.formCar.controls['dniconductor'].setValue(value.dniconductor);
        this.formCar.controls['nombresConductor'].setValue(value.nombresConductor);
        this.formCar.controls['apellidoPaterno'].setValue(value.apellidoPaterno);
        this.formCar.controls['apellidoMaterno'].setValue(value.apellidoMaterno);
        this.formCar.controls['estadoConductor'].setValue(value.estadoConductor);
      }

    }
  }

  saveToList(){
    this._trans.listCarOwner.splice(this.data, 1, this.formCar.value);
    this._msg.successMsg('Automóvil actualizado correctamente','Automóvil actualizado');
    this.dialogRef.close();
  }

}
