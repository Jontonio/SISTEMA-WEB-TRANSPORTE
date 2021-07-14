import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent{

  results: any[] = [
    {
      "name": "2020",
      "value": 73000000
    },
    {
      "name": "2010",
      "value": 73000000
    },
    {
      "name": "2011",
      "value": 89400000
    }, 
    {
      "name": "1990",
      "value": 62000000
    },
  ];
  view: any=[500];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  position: any = 'below';

  colorScheme = 'nightLights'

  constructor() {}

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
