import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { id } from '@swimlane/ngx-charts';
import { ToastrService } from 'ngx-toastr';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {

  desde:number = 0;
  hasta:number = 8;
  activate: boolean = false;

  constructor(public _db:DatabaseService, public _auth:AuthService, private _msg:MessagesService, private dialog:MatDialog) { }

  pageEvent(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  desactivateUser(id:string,sta:boolean){
    const msg = new Message('Eliminar usuario','¿Estas seguro de elimimar al usuario?');
    const ref = this.dialog.open(OptionsComponent,{data:msg})

    ref.afterClosed().subscribe( res => {
      if(res){
        this._auth.updateStatusUser('users',id,!sta).then( res =>{
          if(res){
            this._msg.successMsg('Usuario eliminado exitosamente','Eliminar usuario')
          }
        }).catch( err =>{
          this._msg.errorMsg('Error al eliminar usuario','Eliminar usuario')
        })
      }
    })
  }

}
