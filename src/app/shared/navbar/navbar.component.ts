import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  moveScroll:boolean = false;
  iconMenu:boolean = true;

  @HostListener('window:scroll',['$event'])

  onScroll(){
    const pos = document.documentElement.scrollTop || document.body.scrollTop;
    if(pos==0){
      this.moveScroll = false;
    }else{
      this.moveScroll = true;
    }
  }

  constructor() { }

  positionScroll(){
    var y = window.scrollY;
    console.log(y);
  }
 

}
