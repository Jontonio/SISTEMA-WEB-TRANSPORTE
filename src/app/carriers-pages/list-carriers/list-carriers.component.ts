import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Owner } from 'src/app/models/owner';
import { PreviewOwnerComponent } from 'src/app/profiles/preview-owner/preview-owner.component';
import { DatabaseService } from 'src/app/services/database.service';
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

  constructor(public _trans:TransportService, public _db:DatabaseService, private dialog:MatDialog, public _theme:ThemeService) {}

  pageEvent(e:PageEvent){
    console.log(e)
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  previewOwner(data:Owner){
    this.dialog.open(PreviewOwnerComponent, {data:data, panelClass: 'dialog-container' })
  }

}
