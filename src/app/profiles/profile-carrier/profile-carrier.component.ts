import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Car } from 'src/app/models/Car';
import { commonUser } from 'src/app/models/commonUser';
import { Owner } from 'src/app/models/owner';
import { Valoration } from 'src/app/models/valoration';
import { CommentComponent } from 'src/app/public/forms/comment/comment.component';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-profile-carrier',
  templateUrl: './profile-carrier.component.html',
  styleUrls: ['./profile-carrier.component.css']
})

export class ProfileCarrierComponent {

  uid:string;
  idcar:string;
  owner:Owner;
  existUser:boolean = false;
  listComment:Valoration[] = []
  common:commonUser
  users:string[] = ['José Angel','Angel','María Quispe','Juan Pedro','Santos Damian','Dany Lua'];

  results: any[] = [
    {
      "name": "5",
      "value": 73000000
    },
    {
      "name": "4",
      "value": 73000000
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
  yAxisLabel = 'Population';
  colorScheme = { domain: ['#FAAF05', '#DE8504', '#F57710','#DE4704', '#FA2C05'] }

  onSelect(event:any) {
    console.log(event);
  }

  moveScroll:boolean = false;  
  @HostListener('window:scroll',['$event'])

  onScroll(){
    const pos = document.documentElement.scrollTop || document.body.scrollTop;
    if(pos==0){
      this.moveScroll = false;
    }else{
      this.moveScroll = true;
    }
  }

  constructor(private rutaActiva:ActivatedRoute, 
              public _trans:TransportService, 
              private _auth:AuthService,
              private ruta:Router,
              private dialog:MatDialog,
              private _msg:MessagesService,
              private _sp:NgxSpinnerService) {
    this.verifcarData();
    this.isSesion();
  }

  verifcarData(){

    this._sp.show();
    this._auth.message = 'Cargando Perfil'
    this.rutaActiva.params.subscribe( rutaActiva => {
      this.uid = rutaActiva.uid;
      this.idcar = rutaActiva.idcar;
      this.getOwner(this.uid)
      this.getcar(this.uid, this.idcar);
    })

  }

  getOwner(id:string){
    this._trans.getCarrier(this.uid).then( res => {
      this.owner = res as any;
      this._auth.message = 'Cargando'
      this._sp.hide();
    }).catch(err => {
      this._msg.errorMsg(err,'Error al obtener data');
    })
  }

  getcar(idOwner:string, idCar:string){
    this._trans.getCar(idOwner,idCar).then( res => { })
    .catch( err => {
      console.log(err)
    })
  }

  isSesion(){

    this._auth.userGoogle().then( res => {
      if(res){ 
        this.existUser = true 
        this.common = res as any;
      }
    })

  }

  googleSesion(){

    this._auth.signInGoogle().then( res => {
      console.log(res)
    }).catch( err => {
      console.log(err)
    })

  }

  logout(){
    this._auth.logout();
    this.ruta.navigateByUrl('home');
  }

  openComment(){

    const data = { 
      'uid':this.uid, 
      'idcar':this.idcar,
      'displayName':this.common.displayName,
      'photo':this.common.photoURL,
      'email':this.common.email
    };

    this.dialog.open(CommentComponent,{ panelClass:'container-comment', width:'600px', data:data})
  }
  /*
    displayName
    email
    photoURL
    uid
  */

}
