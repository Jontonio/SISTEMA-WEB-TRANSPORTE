import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Valoration } from 'src/app/models/valoration';
import { MessagesService } from 'src/app/services/messages.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  Comment:FormGroup;
  star:number = 0;
  editComment: boolean = false;
  loadprocess: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public Data: any,
              private fb:FormBuilder, 
              private _trans:TransportService,
              private dialogRef: MatDialogRef<CommentComponent>,
              private _msg:MessagesService) {
    this.formComment();
    this.completeComment();
  }

  ngOnInit(): void {
  }

  formComment(){
    this.Comment = this.fb.group({
      comment:['', Validators.required],
      star:['', Validators.required]
    })
  }

  onRate($event:{oldValue:number, newValue:number}) {
    // console.log(`Old Value:${$event.oldValue}, 
    // New Value: ${$event.newValue}`)
    this.Comment.controls['star'].setValue($event.newValue);
  }

  saveComment(){

    if(this.Comment.invalid){
      Object.keys(this.Comment.controls).forEach( input =>{
        this.Comment.controls[input].markAllAsTouched()
      })
      return;
    }
    
    const valoration = new Valoration(this.Comment.value.comment, 
                                      this.Comment.value.star, 
                                      this.Data.displayName, 
                                      this.Data.photo,
                                      this.Data.email)
    this.loadprocess = true;
    this._trans.addValoration(this.Data.uid, this.Data.idcar,valoration.toObject).then( res => {
      this._msg.messageMaterial('Reseña guardada exitosamente');
      this.dialogRef.close();
      this.cancel();
      this.loadprocess = false;
    }).catch( err => {
      this.loadprocess = false;
    })
    
  }

  completeComment(){
    if(this.Data.id){
      this.editComment = true;
      this.Comment.controls['comment'].setValue(this.Data.comment);
      this.star = this.Data.valoration;
      this.Comment.controls['star'].setValue(this.Data.valoration);
    } else {
      this.editComment = false;
    }
  }

  updateComment(){

    if(this.Comment.invalid){
      Object.keys(this.Comment.controls).forEach( input =>{
        this.Comment.controls[input].markAllAsTouched()
      })
      return;
    }

    const dataUpdate = {
      comment:this.Comment.value.comment,
      valoration: this.Comment.value.star
    }

    this.loadprocess = true;
    this._trans.updateComment(this.Data.uid, this.Data.idcar,this.Data.id, dataUpdate).then( res => {
        this._msg.messageMaterial(res as any);
        this.dialogRef.close();
        this.cancel();
        this.loadprocess = false;
      }).catch( err => {
      this.loadprocess = false;
    })

  }

  get comment(){
    return this.Comment.controls['comment'];
  }

  cancel(){
    this.Comment.reset();
    this.star = 0;
  }
  
  // const data = { 
  //   'uid':this.uid, 
  //   'idcar':this.idcar,
  //   'displayName':this.common.displayName
  // };

}
