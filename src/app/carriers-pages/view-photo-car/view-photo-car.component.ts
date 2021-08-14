import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-photo-car',
  templateUrl: './view-photo-car.component.html',
  styleUrls: ['./view-photo-car.component.css']
})
export class ViewPhotoCarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
