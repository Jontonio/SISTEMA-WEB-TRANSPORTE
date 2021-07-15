import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.css']
})
export class HorizontalBarComponent {

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

  // options
  showXAxis  = true;
  showYAxis  = true;
  gradient   = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = { domain: ['#FAAF05', '#DE8504', '#F57710','#DE4704', '#FA2C05'] }

  constructor() {
    //Object.assign(this, { single })
  }

  onSelect(event:any) {
    console.log(event);
  }

}

