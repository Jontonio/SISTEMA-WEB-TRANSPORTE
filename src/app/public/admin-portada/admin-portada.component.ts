import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Message } from 'src/app/models/message';
import { PortDescriotion } from 'src/app/models/portdaDes';
import { DatabaseService } from 'src/app/services/database.service';
import { ThemeService } from 'src/app/services/theme.service';
import { FormDescripComponent } from '../forms/form-descrip/form-descrip.component';
import { PostComponent } from '../forms/post/post.component';

@Component({
  selector: 'app-admin-portada',
  templateUrl: './admin-portada.component.html',
  styleUrls: ['./admin-portada.component.css']
})
export class AdminPortadaComponent implements OnInit {

  constructor(private mat:MatDialog, public _db:DatabaseService, public _theme:ThemeService) {
    this._db.getDescriptions();
    this._db.getPosts();
  }

  ngOnInit(): void {
  }

  portDescrip(){
    this.mat.open(FormDescripComponent, {disableClose:true, width:'70%', panelClass:'description-modal'})
  }
  
  post(){
    this.mat.open(PostComponent, {disableClose:true, panelClass:'description-modal'})
  }

  editDescription(data:PortDescriotion){
    this.mat.open(FormDescripComponent, {disableClose:true,width:'70%',data:data, panelClass:'description-modal'})
  }

  deleteDescript(data:PortDescriotion){
    const msg = new Message('Eliminar descripción','¿Estas seguro de eliminar la descripción de la portada?');
    const ref = this.mat.open(OptionsComponent,{data:msg, panelClass:'description-modal'})
    ref.afterClosed().subscribe( res => {
      if(res) this._db.deleteDescription(data);
    })
  }

}
