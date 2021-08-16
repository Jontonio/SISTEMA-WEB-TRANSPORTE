import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-enterprice',
  templateUrl: './enterprice.component.html',
  styleUrls: ['./enterprice.component.css']
})
export class EnterpriceComponent implements OnInit {

  constructor( public _theme:ThemeService) { }

  ngOnInit(): void {
  }

}
