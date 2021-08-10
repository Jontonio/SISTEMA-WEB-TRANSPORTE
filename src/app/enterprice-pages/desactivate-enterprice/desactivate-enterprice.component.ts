import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Message } from 'src/app/models/message';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-desactivate-enterprice',
  templateUrl: './desactivate-enterprice.component.html',
  styleUrls: ['./desactivate-enterprice.component.css']
})
export class DesactivateEnterpriceComponent implements OnInit {

  desde:number = 0;
  hasta:number = 9;
  
  constructor(public _db:DatabaseService, 
              private dialog:MatDialog, 
              private _msg:MessagesService,
              public _theme:ThemeService) {}

  ngOnInit(): void {
  }

  pageEvent(e:PageEvent){
    this.desde = e.pageIndex*e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  
  activateEnterprise(id:string, status:string){
    const msg = new Message('Activar empresa','¿Estas seguro de activar la empresa de transportes?');
    const ref = this.dialog.open(OptionsComponent,{data:msg, width:'35%', panelClass:'description-modal'})
    ref.afterClosed().subscribe( res => {
      if(res){
        this._db.statusEnterprise(id,status).then( res => {
          this._msg.successMsg(res as any,'Activar empresa')
        }).catch( err =>{
          this._msg.errorMsg(err,'Activar empresa')
        })
      }
    })
  }

}
