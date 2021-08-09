import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  _color:string
  _backgroundMain:string;
  _backgroundNav:string;
  _box:string;

  constructor() {
    this.verifyTheme();
  }

  lightTheme(){
    this._color = 'green';
    this._backgroundMain = '#fafafaec';
    this._backgroundNav = '#3F3F3F';
    this._box = ''
  }

  darkTheme(){
    this._color = 'white';
    this._backgroundMain = '#121212';
    this._backgroundNav = '#1f1f1f';
    this._box = '#1d1d1d';
  }

  applyMode(state:boolean){
    if(state){
      this.darkTheme();
      localStorage.setItem('theme','dark')
    } else {
      this.lightTheme();
      localStorage.removeItem('theme')
    }
  }

  verifyTheme(){
    if(localStorage.getItem('theme')){
      this.darkTheme();
    } else {
      this.lightTheme();
    }
  }


}
