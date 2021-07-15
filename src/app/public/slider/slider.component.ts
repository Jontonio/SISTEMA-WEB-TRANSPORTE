import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { PortDescriotion } from 'src/app/models/portdaDes';
import { Post } from 'src/app/models/post';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  post:Post
  numero:number = 10;
  Description: PortDescriotion;
  vista:boolean;

  constructor(public _db:DatabaseService) {

    this.Description = new PortDescriotion('Municipalidad de Andahuaylas','Por un servicio mejor a andahuaylas');

    this.vista = true;
    setInterval( () => this.vista = false, 10000)
    
    setInterval(()=>{
      this.vista = true;
      if(_db.listCoverPage.length>0){
        const pos = Math.floor((Math.random() * ((this._db.listCoverPage.length-1) - 0 + 1)) + 0);
        this.Description = new PortDescriotion(_db.listCoverPage[pos].title, _db.listCoverPage[pos].description);
      }else{
        this.Description = new PortDescriotion('Municipalidad de Andahuaylas','Por un servicio mejor a andahuaylas')
      }
    }, 10000)

  }


  posi():number{
      const pos = Math.floor((Math.random() * (this._db.listpost.length- 0 + 1)) + 0);
    return pos;
  }

}
