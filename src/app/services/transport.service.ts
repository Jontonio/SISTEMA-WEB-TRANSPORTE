import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Owner } from '../models/owner';
import { MessagesService } from './messages.service';
import { Car } from '../models/Car';
import { Valoration } from '../models/valoration';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  listCarOwner   : Object[] = [];
  listCarriers   : Owner[] = [];
  listValoration : Valoration[] = [];
  listValorationAdmin : Valoration[] = [];
  listcars       = new Array<any>();
  car            : Car;
  loadGetcarriers: boolean = false;
  url            : string = 'http://localhost:4200/conductor/'
  carriersRef    = this.fs.collection('carriers');
  
  // average valorations
  average        :number = 0;

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
              this.getValoration(idOwner, idCar);
        resolve(res);
      }, err => {
        reject('Error al obtener datoa del vehículo');
      })
    })
  }

  getCarrierCars(id:string){
    return new Promise((resolve,reject) =>{
      if(id){
        this.fs.collection('/carriers/'+id+'/cars').valueChanges().subscribe( res => {
          resolve(res);
        }, err => {
          reject('Error al obtener datos del transportista');
        })
      }
    })
  }

  getcars(){
    this.listcars = [];
    if(this.listCarriers.length>0){
      this.listCarriers.forEach( carrier => {
        this.getCarrierCars(carrier.id).then( res => {
          this.getElementCar(res as any, carrier.id);
        })
      });
    }
  }

  updateId(doc:string, id:string){
    this.fs.collection(doc).doc(id).update({id:id}).then( res =>{
    }).catch( err => {
      this._msg.warningMsg('err update id doc','actualizar usuario');
    })
  }

  updateCarrier(data:any){
    return new Promise((resolve,reject) => {
      this.carriersRef.doc(data.id).update(data).then( res => {
        resolve('Datos actualizados correctamente');
      }).catch( err => {
        reject('Error al actualizar los datos')
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

  addValoration(idOwner:string, idCar:string, data:any){
    return new Promise((resolve, reject) => {
       this.fs.collection('carriers/'+idOwner+'/cars/'+idCar+'/valoration').add(data).then( res => {
         this.updateId('carriers/'+idOwner+'/cars/'+idCar+'/valoration',res.id);
         resolve('Datos registrado correctamente');
       }).catch( err => {
         reject('Error al registrar los datos')
       })
    })
  }

  getValoration(idOwner:string, idCar:string){
    this.fs.collection('carriers/'+idOwner+'/cars/'+idCar+'/valoration', ref => ref.orderBy('dateComent','desc') )
           .valueChanges().subscribe( res => {
             this.listValoration = res as any;
             this.getAverageValoration(this.listValoration);
           })
  }

  getValorationAdmin(idOwner:string, idCar:string){
    this.fs.collection('carriers/'+idOwner+'/cars/'+idCar+'/valoration', ref => ref.orderBy('dateComent','desc') )
           .valueChanges().subscribe( res => {
             this.listValorationAdmin = res as any;
             //this.getAverageValoration(this.listValorationAdmin);
           })
  }


  delteComment(idOwner:string, idCar:string, idValoration:string){
    return new Promise((resolve, reject) => {
      this.fs.collection('carriers/'+idOwner+'/cars/'+idCar+'/valoration').doc(idValoration).delete()
          .then( res => {
            resolve('Reseña eliminada correctamente');
          }).catch( err => {
            reject('Error al eliminar reseña')
          })
    })
  }

  updateComment(idOwner:string, idCar:string, idValoration:string, data:any){
    return new Promise((resolve, reject) => {
      this.fs.collection('carriers/'+idOwner+'/cars/'+idCar+'/valoration').doc(idValoration).update(data)
          .then( res => {
            resolve('Reseña actualizada correctamente');
          }).catch( err => {
            console.log(err)
            reject('Error al actualizar reseña')
          })
    })
  }

  // methods stadist
  getAverageValoration(listValoration:Valoration[]){
    this.average = 0;
    if(listValoration.length>0){
      let sum = 0;
      listValoration.forEach( val => {
        sum += val.valoration;
      })
      this.average = (sum / listValoration.length).toFixed() as any;
    }
  }

  searchTransportista(data:any){
    const carrierFiltrado: Owner[] = [];
    let find:boolean = false;
    this.listCarriers.forEach( carrier =>{
      const nombre = carrier.firts_name.toLocaleLowerCase()
      if(carrier.ID_card.indexOf(data) >= 0 || nombre.indexOf(data) >= 0){
        carrierFiltrado.push(carrier)
        find = true;
      } else {
        find = false;
      }
    })
  }
 
}
