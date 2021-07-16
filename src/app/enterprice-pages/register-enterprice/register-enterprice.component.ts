import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruc } from 'src/app/models/ruc';
import { ApiService } from 'src/app/services/api.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-register-enterprice',
  templateUrl: './register-enterprice.component.html',
  styleUrls: ['./register-enterprice.component.css']
})
export class RegisterEnterpriceComponent implements OnInit {

  idUpdate: string | null;
  edit    : boolean = false;
  loadChage: boolean = false;
  loadRuc  : boolean = false;
  loadRegister: boolean = false;

  formEnterprise:FormGroup;

  constructor(private rutaActiva: ActivatedRoute, 
              private ruta:Router,
              private _db:DatabaseService, 
              private fb:FormBuilder, 
              private _api:ApiService,
              private _msg:MessagesService) {
    this.createForm();
    this.getIdUpdate();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.formEnterprise = this.fb.group({
      id:[''], 
      ruc:['', [Validators.required,Validators.minLength(11),Validators.pattern(/^([0-9])*$/)]], 
      razonSocial:['',Validators.required], 
      telefonos:[''],
      tipo:['',Validators.required],
      estado:['',Validators.required],
      direccion:['',Validators.required],
      departamento:['',Validators.required], 
      provincia:['',Validators.required], 
      distrito:['',Validators.required],
      descripcion:['']
    })
  }

  get ruc(){
    return this.formEnterprise.controls['ruc']
  }
  get razonSocial(){
    return this.formEnterprise.controls['razonSocial']
  }
  get telefonos(){
    return this.formEnterprise.controls['telefonos']
  }
  get tipo(){
    return this.formEnterprise.controls['tipo']
  }
  get estado(){
    return this.formEnterprise.controls['estado']
  }
  get direccion(){
    return this.formEnterprise.controls['direccion']
  }
  get departamento(){
    return this.formEnterprise.controls['departamento']
  }
  get provincia(){
    return this.formEnterprise.controls['provincia']
  }
  get distrito(){
    return this.formEnterprise.controls['distrito']
  }

  getIdUpdate(){
    if(this.rutaActiva.snapshot.paramMap.get('id')){
      this.idUpdate = this.rutaActiva.snapshot.paramMap.get('id');
      this.edit = true;
      this._db.getEnterprise(this.idUpdate as any).then( res => {
        this.completeData(res as Ruc)
      }).catch( err => {
        this._msg.errorMsg(err.message,'Error obtener empresa')
      })
    }
  }

  getRUC(){
    if(this.formEnterprise.controls['ruc'].valid){
      const ruc = this.formEnterprise.value.ruc;
      this.loadRuc = true;
      this._api.enterprise(ruc).then( res => {
        this.completeData(res as Ruc);
        this.loadRuc = false;
      }).catch( err => {
        this.loadRuc = false;
        this._msg.errorMsg(err,'API ruc')
      })
    } 
  }

  completeData(data:Ruc){

    const ruc = new Ruc(data.ruc,
                        data.razonSocial,
                        data.telefonos,
                        data.tipo,
                        data.estado,
                        data.direccion,
                        data.departamento,
                        data.provincia,
                        data.distrito,
                        data.descripcion)
    this.formEnterprise.controls['ruc'].setValue(ruc.getruc()); 
    this.formEnterprise.controls['razonSocial'].setValue(ruc.getrazonSocial()); 
    this.formEnterprise.controls['telefonos'].setValue(ruc.getPhone());
    this.formEnterprise.controls['tipo'].setValue(ruc.gettipo());
    this.formEnterprise.controls['estado'].setValue(ruc.getestado());
    this.formEnterprise.controls['direccion'].setValue(ruc.getdireccion());
    this.formEnterprise.controls['departamento'].setValue(ruc.getdepartamento()); 
    this.formEnterprise.controls['provincia'].setValue(ruc.getprovincia()); 
    this.formEnterprise.controls['distrito'].setValue(ruc.getdistrito());
    this.formEnterprise.controls['descripcion'].setValue(ruc.getdescripcion());
  }

  register(){
    if(this.formEnterprise.invalid){
      Object.keys(this.formEnterprise.controls).forEach( input =>{
        this.formEnterprise.controls[input].markAllAsTouched()
      })
      return;
    }
    this.loadRegister = true;
    this._db.addEnterprise(this.formEnterprise.value).then( res => {
      this._msg.successMsg(res as any,'Registro empresa')
      this.loadRegister = false;
      this.formEnterprise.reset();
    }).catch( err =>{
      this.loadRegister = false;
      this._msg.errorMsg(err as any,'Registro empresa')
    })
  }

  saveChage(){
    if(this.idUpdate){
      this.loadChage = true;
      this.formEnterprise.addControl('id',new FormControl);
      this.formEnterprise.controls['id'].setValue(this.idUpdate);
      this._db.updateEnterprise(this.formEnterprise.value).then( res => {
        this.loadChage = false;
        this.ruta.navigate(['panel-admin/enterprice'])
        this.formEnterprise.removeControl('id')
        this._msg.successMsg(res as any,'Actualizar empresa')
      }).catch( err => {
        this._msg.errorMsg(err,'Actualizar empresa')
      })
    }
  }


  
}
