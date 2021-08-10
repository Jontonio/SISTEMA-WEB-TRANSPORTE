import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-desactivate-carriers',
  templateUrl: './desactivate-carriers.component.html',
  styleUrls: ['./desactivate-carriers.component.css']
})
export class DesactivateCarriersComponent implements OnInit {
  desCarriers: string[] = ['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'];
  desde: number = 0;
  hasta: number = 9;

  constructor( public _theme:ThemeService) { }

  ngOnInit(): void {
  }
  pageEvent(e:PageEvent){
    console.log(e)
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

}
