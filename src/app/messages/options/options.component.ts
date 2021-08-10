import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/models/message';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Message, public _theme:ThemeService) { }

  ngOnInit(): void {}

}
