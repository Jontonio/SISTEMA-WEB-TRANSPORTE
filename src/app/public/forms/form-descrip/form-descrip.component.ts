import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PortDescriotion } from 'src/app/models/portdaDes';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-form-descrip',
  templateUrl: './form-descrip.component.html',
  styleUrls: ['./form-descrip.component.css']
})
export class FormDescripComponent implements OnInit {

  formDescrip:FormGroup
  descrip:PortDescriotion;
  edit:boolean = false;

  constructor(private fb:FormBuilder, 
              private _db:DatabaseService, 
              private _msg:MessagesService,
              public _theme:ThemeService,
              @Inject(MAT_DIALOG_DATA) public data: PortDescriotion, 
              public dialogRef: MatDialogRef<FormDescripComponent>) { 
    this.crearFormulario();
    this.loadData();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formDescrip = this.fb.group({
      title:['',Validators.required],
      description:['',[Validators.required]]
    })
  }

  get title(){
    return this.formDescrip.controls['title']
  }

  get description(){
    return this.formDescrip.controls['description']
  }

  saveDescript(){
    if(this.formDescrip.invalid){
      return;
    }
    this.dialogRef.close();
    const data = new PortDescriotion(this.formDescrip.value.title,this.formDescrip.value.description);
    this._db.addDescripCover(data.toObject).then( res => {
      this._msg.successMsg(res as any,'Registro descripción')
    }).catch( err => {
      this._msg.errorMsg(err,'Registro descripción')
    })
  }
  
  loadData(){
    if(this.data){
      this.edit = true;
      this.formDescrip.controls['title'].setValue(this.data.title);
      this.formDescrip.controls['description'].setValue(this.data.description);
    }
  }

  saveChage(data:PortDescriotion){
    const descrip = new PortDescriotion(this.formDescrip.value.title,this.formDescrip.value.description)
    descrip.setId(data.id);
    this.dialogRef.close();
    this._db.updateDescription(descrip).then( res => {
      this._msg.successMsg(res as any,'Actualizar descripción')
    }).catch( err => {
      this._msg.errorMsg(err,'Error actualizar')
    })
  }
  
}
