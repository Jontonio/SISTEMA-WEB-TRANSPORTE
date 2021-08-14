import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OptionsComponent } from 'src/app/messages/options/options.component';
import { Car } from 'src/app/models/Car';
import { Message } from 'src/app/models/message';
import { Owner } from 'src/app/models/owner';
import { Ruc } from 'src/app/models/ruc';
import { DatabaseService } from 'src/app/services/database.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TransportService } from 'src/app/services/transport.service';
import { RegisterCarComponent } from '../register-car/register-car.component';
import { ViewPhotoCarComponent } from '../view-photo-car/view-photo-car.component';

@Component({
  selector: 'app-owner-car',
  templateUrl: './owner-car.component.html',
  styleUrls: ['./owner-car.component.css']
})
export class OwnerCarComponent {

  owner   :Owner;
  listCars:Car[] = [];
  loadCars:boolean = false;
  showFiller:boolean = false;
  idconductor:string;
  idcar:string;
  enterprise:Ruc;
  placa:string;
  loadResenia: boolean = false;
  results: any[] = [
    {
      "name": "5",
      "value": 73000000
    },
    {
      "name": "4",
      "value": 1
    },
    {
      "name": "3",
      "value": 73000000
    },
    {
      "name": "2",
      "value": 89400000
    }, 
    {
      "name": "1",
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
  yAxisLabel = 'Valoración';
  colorScheme = { domain: ['#FAAF05', '#DE8504', '#F57710','#DE4704', '#FA2C05'] }

  constructor(private rutaActiva:ActivatedRoute, 
              public _trans:TransportService,
              private dialog:MatDialog,
              public _theme:ThemeService,
              private _db:DatabaseService, 
              private _msg:MessagesService) {
    this.data();
  }
  
  onSelect(event:any) {
    console.log(event);
  }

  data(){
    if(this.rutaActiva.snapshot.paramMap.get('id')){
      this.idconductor  = this.rutaActiva.snapshot.paramMap.get('id') as any;
      this._trans.getCarrier(this.idconductor).then( res => {
        this.owner = res as any;
        this.getCars(this.idconductor);
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

  verResenia(idcar:string,idEmpresa:string, placa:string){
    this.placa = placa;
    this.idcar = idcar;
    this.loadResenia = true;
    this._trans.getValorationAdmin(this.idconductor, idcar);
    this._db.getEnterprise(idEmpresa).then( res => {
      setTimeout(() => this.loadResenia = false , 800);
      this.enterprise = res as any;
    }).catch( err => {
      this.loadResenia = false;
      this._msg.warningMsg(err,'Error al obtener reseña');
    })
  }

  deleteComment(idValoration:string){
      const msg = new Message('Eliminar reseña','¿Estas seguro de eliminar la reseña del transportista?');
      const ref = this.dialog.open(OptionsComponent,{data:msg, width:'35%', panelClass:'description-modal'})
      ref.afterClosed().subscribe( res => {
        if(res){
          this._trans.delteComment(this.idconductor, this.idcar, idValoration).then( res => {
            this._msg.successMsg(res as any,'Eliminar reseña')
          }).catch( err =>{
            this._msg.errorMsg(err,'Eliminar empresa')
          })
        }
      })
  }

  editCar(car:any){
    const Data = { ...car,'idOwner':this.idconductor};
    this.dialog.open(RegisterCarComponent, { width:'100%', data:Data});
  }

  openViewImage(data:Car){
    this.dialog.open(ViewPhotoCarComponent,{data:data})
  }

  addCar(){
    const Data = {'new':true,'idOwner':this.idconductor};
    this.dialog.open(RegisterCarComponent, { width:'100%', data:Data});
  }

}
