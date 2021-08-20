import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _db:DatabaseService) { 
    this._db.getDescriptions();
    this._db.getPosts();
  }

  ngOnInit(): void {
  }

}
