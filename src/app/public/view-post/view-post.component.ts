import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Message } from 'src/app/models/message';
import { Post } from 'src/app/models/post';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent{

  post:Post

  constructor(private activeRuta:ActivatedRoute, 
              private _db:DatabaseService, 
              private _msg:MessagesService,
              private mat:MatDialog,
              public _theme:ThemeService,
              private ruta:Router) { 
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

  deletePost(id:string){
    const msg = new Message('Eliminar Post de portada','¿Estas seguro de eliminar el post de la portada?');
    const ref = this.mat.open(OptionsComponent,{data:msg, panelClass:'description-modal'})
    ref.afterClosed().subscribe( res => {
      if(res){
        this._db.deletePost(id);
        this.ruta.navigate(['panel-admin/portada-web'])
      } 
    })
  }

}
