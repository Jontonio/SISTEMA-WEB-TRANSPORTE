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

  listCarOwner        : Object[] = [];
  listCarriers        : Owner[] = [];
  listCarriersDes     : Owner[] = [];
  listValoration      : Valoration[] = [];
  listValorationAdmin : Valoration[] = [];
  listcars            = new Array<any>();
  listCarsOnly        : Car[] = [];
  car                 : Car;
  loadGetcarriers     : boolean = false;
  loadGetcarriersDes  : boolean = false;
  url                 : string = 'https://jontonio.github.io/SISTEMA-WEB-TRANSPORTE/conductor/'
  carriersRef         = this.fs.collection('carriers', ref => ref.where('status','==',true));
  carriersRefDes      = this.fs.collection('carriers', ref => ref.where('status','==',false));
  
  // average valorations
  average        :number = 0;

  constructor(private _msg:MessagesService, 
              private fs: AngularFirestore,
              private storage:AngularFireStorage) {
              this.getCarriers();
  }
  
  // add list carriers
  addListCar(data:Object){
    return new Promise((resolve, reject) => {
      this.listCarOwner.push(data);
      resolve(true);
    })
  }
  
  // delete car from local array
  deleteCar(indice:number){
    return new Promise((resolve, reject) => {
      this.listCarOwner.splice(indice,1);
      resolve(true);
    })
  }

  // add car to firebase
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
      this.fs.collection(`/carriers/${id}/cars`).add(data[i]).then( res => {
        this.updateId(`/carriers/${id}/cars`,res.id);
        console.log('car registrado correctamente');
      }).catch( err => {
        this._msg.errorMsg('Error al registrar el vehiculo','Error al registrar la data')
      })
    }
  }
  
  // add only one car to firebase
  addOnlyCar(idowner:string, data:any){
    return new Promise((resolve, reject) => {
      this.fs.collection(`/carriers/${idowner}/cars`).add(data).then( res => {
        this.updateId(`/carriers/${idowner}/cars`,res.id);
        resolve('vehículo añadido correctamente')
      }).catch( err => {
        reject('Error al registrar el vehiculo');
      })
    })
  }

  // get carriers from firebase
  getCarriers(){
    this.loadGetcarriers = true;
    this.carriersRef.valueChanges().subscribe( res => {
      this.listCarriers = res as Owner[];
      this.loadGetcarriers = false;
      this.getcars();
    }, err =>{
      this.loadGetcarriers = false;
      this._msg.warningMsg('err al obtener lista de transportistas','Error 504');
    })
  }

  // get carriers desactivated
  getCarriersDesactivate(){
    this.loadGetcarriersDes = true;
    this.carriersRefDes.valueChanges().subscribe( res => {
      this.listCarriersDes = res as Owner[];
      this.loadGetcarriersDes = false;
    }, err =>{
      this.loadGetcarriersDes = false;
      this._msg.warningMsg('err al obtener lista de transportistas desactivados','Error 504');
    })
  }
  
  // get one car
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
      this.fs.collection(`/carriers/${idOwner}/cars`).doc(idCar)
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
        this.fs.collection(`/carriers/${id}/cars`).valueChanges().subscribe( res => {
          this.listCarsOnly = res as Car[];
          resolve(res);
        }, err => {
          reject('Error al obtener datos del transportista');
        })
      }
    })
  }

  getcars(){
    this.listcars = [];
    if(this.listCarriers.length > 0){
      this.listCarriers.forEach( carrier => {
        this.getCarrierCars(carrier.id).then( res => {
          this.getElementCar(res as Car[], carrier.id);
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

  async getElementCar(data:Car[], idOwner:string){
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
       this.fs.collection(`carriers/${idOwner}/cars/${idCar}/valoration`).add(data).then( res => {
         this.updateId(`carriers/${idOwner}/cars/${idCar}/valoration`,res.id);
         resolve('Datos registrado correctamente');
       }).catch( err => {
         reject('Error al registrar los datos')
       })
    })
  }

  getValoration(idOwner:string, idCar:string){
    this.fs.collection(`carriers/${idOwner}/cars/${idCar}/valoration`, ref => ref.orderBy('dateComent','desc') )
           .valueChanges().subscribe( res => {
             this.listValoration = res as any;
             this.getAverageValoration(this.listValoration);
           })
  }

  getValorationAdmin(idOwner:string, idCar:string){
    this.fs.collection(`carriers/${idOwner}/cars/${idCar}/valoration`, ref => ref.orderBy('dateComent','desc') )
           .valueChanges().subscribe( res => {
             this.listValorationAdmin = res as any;
           })
  }


  delteComment(idOwner:string, idCar:string, idValoration:string){
    return new Promise((resolve, reject) => {
      this.fs.collection(`carriers/${idOwner}/cars/${idCar}/valoration`).doc(idValoration).delete()
          .then( res => {
            resolve('Reseña eliminada correctamente');
          }).catch( err => {
            reject('Error al eliminar reseña')
          })
    })
  }

  updateComment(idOwner:string, idCar:string, idValoration:string, data:any){
    return new Promise((resolve, reject) => {
      this.fs.collection(`carriers/${idOwner}/cars/${idCar}/valoration`).doc(idValoration).update(data)
          .then( res => {
            resolve('Reseña actualizada correctamente');
          }).catch( err => {
            reject('Error al actualizar reseña')
          })
    })
  }

  updateStatus(status:boolean, id:string){
    return new Promise((resolve, reject) =>{
      this.carriersRef.doc(id).update({'status':status})
          .then( res => {
            if(status){
              resolve('Transportista activado correctamente');
            }else{
              resolve('Transportista desactivado correctamente');
            }
          }).catch( err => {
            reject('Error al actualizar reseña')
          })
    })
  }

  updateStatusCar(idOwner:string, idcar:string,status:boolean){
    return new Promise((resolve, reject) =>{
      this.fs.collection(`carriers/${idOwner}/cars`).doc(idcar).update({'status':status})
          .then( res => {
            if(status){
              resolve('Vehículo activado correctamente');
            }else{
              resolve('Vehículo desactivado correctamente');
            }
          }).catch( err => {
            reject('Error al actualizar estado vehículo')
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

  // find carriers, this for verication and not register again
  findTransportista(dni:string){
    return new Promise( (resolve, reject) =>{
      this.fs.collection('carriers', ref => ref.where('ID_card','==',dni)).valueChanges().subscribe( res => {
          if(res.length > 0){ 
            resolve(true)
          } else {
            resolve(false) 
          }
      }, err => {
        reject(err)
      })
    })
  }

  // update car
  updateCar(idowner:string, idcar:string, data:any){
    return new Promise((resolve, reject) => {
      this.fs.collection(`/carriers/${idowner}/cars`).doc(idcar).update(data)
          .then( res => {
            resolve('Reseña actualizada correctamente');
          }).catch( err => {
            console.log(err)
            reject('Error al actualizar datos')
          })
    })
  }

  uploadImg  :boolean = false;
  urlCarPhoto:string;
  porcentajeCar:number = 0;

  // function for upload file photo car
  onFotoCar(event:any) {

    this.uploadImg = true;
    const time = new Date().getTime();
    const file = event.target.files[0];
    const ruta = 'cars-photo/'+time;
    const ref = this.storage.ref(ruta);
    const task = ref.put(file);

    //verificamos mientras se sube la foto
    task.then((tarea)=>{
        ref.getDownloadURL().subscribe((imgUrl)=>{
          this.urlCarPhoto = imgUrl;
          this.uploadImg = false;
          this.porcentajeCar = 0;
        })
    })
     //observale de la subida del archivo en %
    task.percentageChanges().subscribe((porcentaje)=>{
        if(porcentaje){
          this.porcentajeCar = parseInt(porcentaje.toString(),10)
        }
    })
  }

  uploadFile :boolean = false;
  urlCarFile:string;
  porcentajeFile:number = 0;

  // function for upload file 
  onFileTarjeta(event:any) {

    this.uploadFile = true;
    const time = new Date().getTime();
    const file = event.target.files[0];
    const ruta = 'cars-files/'+time;
    const ref = this.storage.ref(ruta);
    const task = ref.put(file);

    //verificamos mientras se sube la foto
    task.then((tarea)=>{
        ref.getDownloadURL().subscribe((imgUrl)=>{
          this.urlCarFile = imgUrl;
          this.uploadFile = false;
          this.porcentajeFile = 0;
        })
    })
     //observale de la subida del archivo en %
    task.percentageChanges().subscribe((porcentaje)=>{
        if(porcentaje){
          this.porcentajeFile = parseInt(porcentaje.toString(),10)
        }
    })
  }

  // find one car for not register again
  findCar(placa:string):number{
    return this.listcars.indexOf(this.listcars.find(x => x.placa === placa));
  }
 
}
