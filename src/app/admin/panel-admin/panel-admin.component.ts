import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgLogoutComponent } from 'src/app/messages/msg-logout/msg-logout.component';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  @ViewChild('drawer',{static:false}) drawer:any;
  modo: any = 'side';
  
  constructor(private dialog:MatDialog, 
              public _theme:ThemeService, 
              public _db:DatabaseService,
              public _auth:AuthService) {
                this._db.getUsers();
                this._db.getEnterprises();
  }

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
    this.dialog.open(MsgLogoutComponent, {panelClass:'description-modal'});
  }

  changeTheme(){
    this._theme.modePage = !this._theme.modePage;
    this._theme.applyMode(this._theme.modePage);
  }


}
