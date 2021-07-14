import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent{

  post:Post

  constructor( private activeRuta:ActivatedRoute, private _db:DatabaseService, private _msg:MessagesService) { 
    this.data();
  }

  data(){
    if(this.activeRuta.snapshot.paramMap.get('id')){
      const id  = this.activeRuta.snapshot.paramMap.get('id');
      this._db.getPost(id as any).then( res => {
        this.post = res as any;
      }).catch( err => {
        this._msg.errorMsg(err,'Error al obtener data transportista')
      })
    }
  }

}
