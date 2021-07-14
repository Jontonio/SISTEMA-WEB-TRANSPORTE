import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgLogoutComponent } from 'src/app/messages/msg-logout/msg-logout.component';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  @ViewChild('drawer',{static:false}) drawer:any;
  modo: any = 'side';
  modePage: boolean = false;
  
  constructor( private dialog:MatDialog, private _database:DatabaseService, public _auth:AuthService) {}

  ngOnInit(): void {}

  modePhone(){
    this.drawer.toggle();
    this.modo = 'over'
  }

  modeDesktop(){
    this.drawer.toggle();
    this.modo = 'side'
  }
  openLogout() {
    this.dialog.open(MsgLogoutComponent);
  }

  usuario(){
    this._auth.isActiveUser().subscribe( res => {
    })
  }


}
