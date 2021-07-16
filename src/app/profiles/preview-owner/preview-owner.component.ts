import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Owner } from 'src/app/models/owner';

@Component({
  selector: 'app-preview-owner',
  templateUrl: './preview-owner.component.html',
  styleUrls: ['./preview-owner.component.css']
})
export class PreviewOwnerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Owner) { }

  ngOnInit(): void {
  }

}
