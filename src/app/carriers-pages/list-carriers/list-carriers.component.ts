import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Message } from 'src/app/models/message';
import { Owner } from 'src/app/models/owner';
import { PreviewOwnerComponent } from 'src/app/profiles/preview-owner/preview-owner.component';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-list-carriers',
  templateUrl: './list-carriers.component.html',
  styleUrls: ['./list-carriers.component.css']
})
export class ListCarriersComponent {

  desde       : number = 0;
  hasta       : number = 9;
  ownerPreview: Owner;
  value:string;

  constructor(public _trans:TransportService, 
              public _db:DatabaseService, 
              private dialog:MatDialog, 
              private _msg: MessagesService,
              public _theme:ThemeService) {
              this._trans.getCarriersDesactivate();
  }

  pageEvent(e:PageEvent){
    console.log(e)
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  previewOwner(data:Owner){
    this.dialog.open(PreviewOwnerComponent, {data:data, panelClass: 'dialog-container' })
  }

  setEstatuscarrier(status:boolean, id:string){
    const ms = '¿Estas seguro de desactivar al transportita?. Recuerda que es recomendable desactivar sus vehículos';
    const msg = new Message('Desactivar transportista', ms);
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
