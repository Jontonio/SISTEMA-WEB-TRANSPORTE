import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public _db:DatabaseService, 
              private _msg:MessagesService, 
              public _theme:ThemeService,
              public dialogRef: MatDialogRef<PostComponent>) { }

  ngOnInit(): void {
  }

  savePost(){
    if(this._db.imgauxPost){
      const data = new Post(this._db.imgauxPost);
      this.dialogRef.close();
      this._db.addPost(data.toObject).then( res => {
        this._msg.successMsg(res as any,'Guaradar post')
        this._db.imgauxPost = '';
      })
    }else {
      this._msg.warningMsg('Suba el post antes de guardar','Post vacio')
    }
  }

}
