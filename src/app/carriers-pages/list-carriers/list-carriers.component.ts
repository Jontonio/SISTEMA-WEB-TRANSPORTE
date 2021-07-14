import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from 'src/app/models/owner';
import { DatabaseService } from 'src/app/services/database.service';
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

  constructor( public _trans:TransportService, public _db:DatabaseService) {}

  pageEvent(e:PageEvent){
    console.log(e)
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

  previewOwner(i:number){
    this.ownerPreview = this._trans.listCarriers[i];
  }

}
