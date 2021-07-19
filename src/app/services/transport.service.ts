import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Owner } from '../models/owner';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  listCarOwner   : Object[] = [];
  loadGetcarriers: boolean = false;
  carriersRef = this.fs.collection('carriers');
  carsRef = this.fs.collection('carriers/BejZJN7FE7PDrLwjm3N8/cars');

  listCarriers: Owner[] = [];

  constructor(private _msg:MessagesService, 
              private fs: AngularFirestore, 
              private storage:AngularFireStorage) {
              this.getCarriers();
  }
  
  addListCar(data:Object){
    return new Promise((resolve, reject) => {
      this.listCarOwner.push(data);
      resolve(true);
    })
  }
  
  deleteCar(indice:number){
    return new Promise((resolve, reject) => {
      this.listCarOwner.splice(indice,1);
      resolve(true);
    })
  }

  addCarrier(data:any){
    return new Promise((resolve,reject) => {
      this.carriersRef.add(data).then( res => {
        this.updateId('carriers',res.id);
        resolve('Datos registrado correctamente');
      }).catch( err => {
        reject('Error al registrar la data')
      })
    })
  }

  getCarriers(){
    this.loadGetcarriers = true;
    this.carriersRef.valueChanges().subscribe( res => {
      this.listCarriers = res as any;
      this.loadGetcarriers = false;
    }, err =>{
      this.loadGetcarriers = false;
      this._msg.warningMsg('err al obtener lista de transportistas','Error 504');
    })
  }

  getCarrier(id:string){
    return new Promise((resolve,reject) =>{
      this.carriersRef.doc(id).valueChanges().subscribe( res => {
        resolve(res);
      }, err => {
        reject('Error al obtener datos del transportista');
      })
    })
  }

  updateId(doc:string, id:string){
    this.fs.collection(doc).doc(id).update({id:id}).then( res =>{
    }).catch( err => {
      this._msg.warningMsg('err update id doc','actualizar usuario');
    })
  }
 
}
