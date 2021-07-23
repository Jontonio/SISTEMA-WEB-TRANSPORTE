import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/Car';
import { Owner } from 'src/app/models/owner';
import { MessagesService } from 'src/app/services/messages.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-owner-car',
  templateUrl: './owner-car.component.html',
  styleUrls: ['./owner-car.component.css']
})
export class OwnerCarComponent {

  owner   :Owner;
  listCars:Car[] = [];
  loadCars:boolean = false;

  constructor(private rutaActiva:ActivatedRoute, public _trans:TransportService, private _msg:MessagesService) {
    this.data();
  }

  data(){
    if(this.rutaActiva.snapshot.paramMap.get('id')){
      const id  = this.rutaActiva.snapshot.paramMap.get('id');
      this._trans.getCarrier(id as any).then( res => {
        this.owner = res as any;
        this.getCars(id as any);
      }).catch( err => {
        this._msg.errorMsg(err,'Error al obtener data transportista')
      })
    }
  }

  getCars(id:string){
    this.loadCars = true;
    this._trans.getCarrierCars(id).then( res => {
      if(res){
        this.listCars = res as Array<Car>;
        this.loadCars = false
      }else{
        this.loadCars = true
      }
    }).catch( err => {
      this.loadCars = false;
      console.log(err)
    })
  }

}
