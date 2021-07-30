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

  pos2:number = 0;
  post:Post
  indice:number = 0;
  Description: PortDescriotion;
  vista:boolean;
  
  constructor(public _db:DatabaseService) {

    this.Description = new PortDescriotion('Municipalidad de Andahuaylas','Por un servicio mejor a Andahuaylas');

    this.vista = true;
    setInterval( () => this.vista = false, 10000)
    
    setInterval(()=>{
      this.vista = true;
      if(_db.listCoverPage.length>0){
        this.Description = new PortDescriotion(_db.listCoverPage[this.indice].title, _db.listCoverPage[this.indice].description);
        this.indice = this.indice + 1;
        if(this.indice>=_db.listCoverPage.length){
          this.indice = 0;
        }
      }else{
        this.Description = new PortDescriotion('Municipalidad de Andahuaylas','Por un servicio mejor a andahuaylas')
      }
    }, 10000)

  }

}
