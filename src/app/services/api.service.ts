import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Ruc } from '../models/ruc';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'https://dniruc.apisperu.com/api/v1/';
  key: string = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvc2VhbnRvbmlvcnN5c3RlbUBnbWFpbC5jb20ifQ.BCnFI0IWlU9IEjv5pXu74c8yysKmGP_NN1_c7kmu-QI';

  constructor( private http:HttpClient, private _msg:MessagesService) {}

  person(dni:string){
    return new Promise( (resolve, reject) =>{
      this.http.get(`${this.url}dni/${dni}${this.key}`).subscribe( res => {
        resolve(res as Person);
      }, err => {
        reject('Error al hacer la petición (api dni)');
      })
    })
  }

  enterprise(ruc:string){
    return new Promise( (resolve,reject)=>{
      this.http.get(`${this.url}ruc/${ruc}${this.key}`).subscribe( res =>{
        resolve(res as Ruc)
      }, err =>{
        this._msg.errorMsg(err.message,'Error api RUC')
      })
    })
  }

}

