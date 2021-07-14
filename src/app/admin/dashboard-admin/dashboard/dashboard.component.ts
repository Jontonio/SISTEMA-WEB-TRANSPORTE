import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { TransportService } from 'src/app/services/transport.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( public _db:DatabaseService, public _trans:TransportService) {}

}
