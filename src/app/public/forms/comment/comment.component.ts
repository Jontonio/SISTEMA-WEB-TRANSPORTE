import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { commonUser } from 'src/app/models/commonUser';
import { Valoration } from 'src/app/models/valoration';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() data:commonUser;

  Comment:FormGroup;
  star:number = 0;

  constructor(private fb:FormBuilder, private _trans:TransportService) {
    this.formComment();
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
                                      this.data.displayName, 
                                      this.data.email)
    this._trans.RegisterComment('smm6HvzAJ4Ilg1iSb5Nt',valoration.toObject);

  }

  get comment(){
    return this.Comment.controls['comment'];
  }

  cancel(){
    this.Comment.reset();
    this.star = 0;
    console.log(this.star)
  }
  

}
