import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Owner } from 'src/app/models/owner';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-profile-carrier',
  templateUrl: './profile-carrier.component.html',
  styleUrls: ['./profile-carrier.component.css']
})
export class ProfileCarrierComponent implements OnInit {

  uid:string;
  id:string;
  owner:Owner;
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

  constructor(private ruta:ActivatedRoute, 
              private _trans:TransportService, 
              private _auth:AuthService,
              private _msg:MessagesService,
              private _sp:NgxSpinnerService) {
    this.verifcarData();
  }

  ngOnInit(): void {
  
  }

  verifcarData(){
    this._sp.show();
    this._auth.message = 'Cargando Perfil'
    this.ruta.params.subscribe( res => {
      this.uid = res.uid;
      this.id = res.id;
      this._trans.getCarrier(this.uid).then( res => {
        this.owner = res as any;
        this._auth.message = 'Cargando'
        this._sp.hide();
      }).catch(err => {
        this._msg.errorMsg(err,'Error al obtener data');
      })
    })
  }


}
