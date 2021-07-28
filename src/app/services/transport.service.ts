import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Owner } from '../models/owner';
import { MessagesService } from './messages.service';
import firestore from 'firebase/app';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  listCarOwner   : Object[] = [];
  loadGetcarriers: boolean = false;
  carriersRef = this.fs.collection('carriers');
  listCarriers   : Owner[] = [];
  listcars       = new Array<any>();
  car            : Car;
  url            : string = 'http://localhost:4200/conductor/'

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

  addCarrier(data:any,dataCar:any){
    return new Promise((resolve,reject) => {
      this.carriersRef.add(data).then( res => {
          this.updateId('carriers',res.id);
          this.addCar(dataCar,res.id)
          this.listCarOwner = [];
          resolve('Datos registrado correctamente');
      }).catch( err => {
        reject('Error al registrar la data')
      })
    })
  }

  addCar(data:[],id:string){
    for(let i = 0; i < data.length; i++){
      this.fs.collection('/carriers/'+id+'/cars').add(data[i]).then( res => {
        this.updateId('/carriers/'+id+'/cars',res.id);
        console.log('car registrado correctamente');
      }).catch( err => {
        this._msg.errorMsg('Error al registrar el vehiculo','Error al registrar la data')
      })
    }
  }

  getCarriers(){
    this.loadGetcarriers = true;
    this.carriersRef.valueChanges().subscribe( res => {
      this.listCarriers = res as any;
      this.loadGetcarriers = false;
      this.getcars();
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

  getCar(idOwner:string, idCar:string){
    return new Promise((resolve,reject) =>{
      this.fs.collection('/carriers/'+idOwner+'/cars').doc(idCar)
             .valueChanges().subscribe( res => {
              this.car = res as Car;
        resolve(res);
      }, err => {
        reject('Error al obtener datoa del vehículo');
      })
    })
  }

  // /carriers/0BSMvGTMqhphqbvnDxon/cars/Nsy0RiPOfBnER8qXksem

  getCarrierCars(id:string){
    return new Promise((resolve,reject) =>{
      this.fs.collection('carriers/'+id+'/cars').valueChanges().subscribe( res => {
        resolve(res);
      }, err => {
        reject('Error al obtener datos del transportista');
      })
    })
  }

  getcars(){
    if(this.listCarriers.length>0){
      this.listCarriers.forEach( carrier => {
        this.getCarrierCars(carrier.id).then( res => {
          this.getElementCar(res as any, carrier.id);
        })
      });
      console.log(this.listcars)
    }
  }

  updateId(doc:string, id:string){
    this.fs.collection(doc).doc(id).update({id:id}).then( res =>{
    }).catch( err => {
      this._msg.warningMsg('err update id doc','actualizar usuario');
    })
  }
  // /carriers/0BSMvGTMqhphqbvnDxon/cars/Nsy0RiPOfBnER8qXksem
  RegisterComment(idOwner:string,idcar:string,data:any){
    return new Promise((resolve,reject) => {
      this.fs.collection('carriers/'+idOwner+'/cars').doc(idcar).update({
        valoration: firestore.firestore.FieldValue.arrayUnion(data)
      }).then( res => {
        resolve('Datos registrado correctamente');
      }).catch( err => {
        reject('Error al registrar la data')
      })
    })
  }

  async getElementCar(data:[],idOwner:string){
    if(data.length > 0){
      data.forEach( (car:Car) => {
        const link = `${this.url}${idOwner}/${car.id}`
        let newData = {...(car as object), idOwner, link}
        this.listcars.push(newData as any)
      });
    }
  }
 
}
