import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-list-desac-user',
  templateUrl: './list-desac-user.component.html',
  styleUrls: ['./list-desac-user.component.css']
})
export class ListDesacUserComponent implements OnInit {

  desde:number = 0;
  hasta:number = 8;
  activate: boolean = false;

  constructor(public _db:DatabaseService, 
              private _auth:AuthService, 
              private _ts:ToastrService, 
              private dialog:MatDialog,
              public _theme:ThemeService) { }

  ngOnInit(): void {
  }

  pageEvent(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  desactivateUser(id:string,sta:boolean){

    const msg = new Message('Activar usuario','¿Estas seguro de activar al usuario?');
    const ref = this.dialog.open(OptionsComponent,{data:msg, width:'35%'})

    ref.afterClosed().subscribe( res => {
      if(res){
        this._auth.updateStatusUser('users',id,!sta).then( res =>{
          if(res){
            this._ts.success('Usuario activado exitosamente','Activar usuario',{positionClass:'toast-bottom-right'})
          }
        }).catch( err =>{
          this._ts.error('Error al activar usuario','Activar usuario')
        })
      }
    })
  }


}
