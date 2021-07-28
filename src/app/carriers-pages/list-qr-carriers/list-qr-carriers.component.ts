import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DatabaseService } from 'src/app/services/database.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-list-qr-carriers',
  templateUrl: './list-qr-carriers.component.html',
  styleUrls: ['./list-qr-carriers.component.css']
})
export class ListQrCarriersComponent{

  desde       : number = 0;
  hasta       : number = 9;
  
  constructor(public _trans:TransportService, public _db:DatabaseService) {}

  pageEvent(e:PageEvent){
    console.log(e)
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

}
