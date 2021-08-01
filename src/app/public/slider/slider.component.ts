import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  vistaPost:boolean;
  countPost: number = 0
  img:string = '../../../assets/img/svg/order_a_car.svg';

  constructor(public _db:DatabaseService, private _sp:NgxSpinnerService) {
    this.viewDescription();
    this.viewPost();
  }

  viewDescription(){
    this.Description = new PortDescriotion('Municipalidad provincial de Andahuaylas','Por un servicio mejor a Andahuaylas');
    this.vista = true;
    setInterval( () => this.vista = false, 10000)

    setInterval(()=>{
      this.vista = true;
      if(this._db.listCoverPage.length > 0){
        this.Description = new PortDescriotion(this._db.listCoverPage[this.indice].title, this._db.listCoverPage[this.indice].description);
        this.indice = this.indice + 1;
        if(this.indice>=this._db.listCoverPage.length){
          this.indice = 0;
        }
      }else{
        this.Description = new PortDescriotion('Municipalidad de Andahuaylas','Por un servicio mejor a andahuaylas')
      }
    }, 10000)

  }

  viewPost(){
    this.vistaPost = true;
    setInterval( () => this.vistaPost = false, 25000)
    setInterval(()=>{
      this.vistaPost = true;
      if(this._db.listpost.length > 0 ){
        if(this.countPost >= this._db.listpost.length){ this.countPost = 0 }
        this.img = this._db.listpost[this.countPost].url;
        this.countPost = this.countPost + 1;
      }else{
        this.img = '../../../assets/img/svg/order_a_car.svg';
      }
    },25000)
  }

}
