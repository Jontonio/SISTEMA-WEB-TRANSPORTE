import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DesactivateUserComponent } from 'src/app/messages/desactivate-user/desactivate-user.component';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Message } from 'src/app/models/message';
import { Ruc } from 'src/app/models/ruc';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';
import { RegisterEnterpriceComponent } from '../register-enterprice/register-enterprice.component';

@Component({
  selector: 'app-list-enterprice',
  templateUrl: './list-enterprice.component.html',
  styleUrls: ['./list-enterprice.component.css']
})
export class ListEnterpriceComponent implements OnInit {

  desde:number = 0;
  hasta:number = 9;

  constructor(public dialog: MatDialog, public _db:DatabaseService, private _msg:MessagesService, public _theme:ThemeService) { }

  ngOnInit(): void {
  }

  openUpdate() {
    this.dialog.open(RegisterEnterpriceComponent);
  }
  pageEvent(e:PageEvent){
    console.log(e)
    this.desde = e.pageSize*e.pageIndex;
    this.hasta = this.desde + e.pageSize;
  }
  dialogDesactivate() {
    this.dialog.open(DesactivateUserComponent);
  }

  desactivateEnterprise(id:string, status:string){
    const msg = new Message('Desactivar empresa','¿Estas seguro de desactivar la empresa de transportes?');
    const ref = this.dialog.open(OptionsComponent,{data:msg, width:'35%',panelClass:'description-modal'})
    ref.afterClosed().subscribe( res => {
      if(res){
        this._db.statusEnterprise(id,status).then( res => {
          this._msg.successMsg(res as any,'Desactivar empresa')
        }).catch( err =>{
          this._msg.errorMsg(err,'Desactivar empresa')
        })
      }
    })
  }

}
