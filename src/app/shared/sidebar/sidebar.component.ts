import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgLogoutComponent } from 'src/app/messages/msg-logout/msg-logout.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public dialog: MatDialog, public _auth:AuthService) { }

  ngOnInit(): void {
  }

  openLogout() {
    this.dialog.open(MsgLogoutComponent);
  }

}
