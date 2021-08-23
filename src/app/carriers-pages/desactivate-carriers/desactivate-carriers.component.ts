import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Message } from 'src/app/models/message';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-desactivate-carriers',
  templateUrl: './desactivate-carriers.component.html',
  styleUrls: ['./desactivate-carriers.component.css']
})
export class DesactivateCarriersComponent implements OnInit {
  desCarriers: string[] = ['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'];
  desde: number = 0;
  hasta: number = 9;
  value: string;

  constructor( public _theme:ThemeService, 
               public _trans:TransportService,
               private _msg: MessagesService, 
               private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  pageEvent(e:PageEvent){
    console.log(e)
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  setEstatuscarrier(status:boolean, id:string){
    const ms = '¿Estas seguro de activar al transportita?';
    const msg = new Message('Activar a transportista', ms);
    const ref = this.dialog.open(OptionsComponent,{data:msg, panelClass:'description-modal'})
    ref.afterClosed().subscribe( res => {
      if(res){
        this._trans.updateStatus(!status, id).then( res => {
          this._msg.successMsg(res as string,'Transportista');
        }).catch( err => {
          this._msg.errorMsg(err, 'Transportista');
        })
      }
    })
  }

}
