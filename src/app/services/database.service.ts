import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { MessagesService } from './messages.service';
import { Ruc } from '../models/ruc';
import { PortDescriotion } from '../models/portdaDes';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  listUsers        : User[] = [];
  listUsersdisable : User[] = [];
  listEnterpise    : Ruc[] = [];
  listEnterpiseDes : Ruc[] = [];
  listpost         : Post[] = [];
  listCoverPage    : PortDescriotion[] = [];
  porcentajeSFoto  : number = 0;
  subiedoImg       : boolean = false;
  loadGet          : boolean = false;
  loadGetenterprise: boolean = false;
  loadDesacEnter   : boolean = false;
  loadGetdescript  : boolean = false;
  loadGetDisable   : boolean = false;
  loadGetpost      : boolean = false;
  
  imgURL           : string = "../../../assets/img/img-user/default-user.png";
  imgauxPost           : string = '';
  // instancias de las clases
  descripcion: PortDescriotion;
  // Referecia a los documentos
  userRef       = this.fs.collection('users');
  enterpriseRef = this.fs.collection('enterprise');
  coverpageRef  = this.fs.collection('coverPage', ref => ref.orderBy('dateDescription','desc'));
  postRef       = this.fs.collection('post', ref => ref.orderBy('date','desc'));

  constructor(private fs: AngularFirestore, 
              private ruta:Router,
              private _auth:AngularFireAuth,
              private storage:AngularFireStorage, 
              private _msg:MessagesService) {
    this.getUsers();
    this.getUsersdisable();
    this.getEnterprises();
    this.getDescriptions();
    // this.getDesactEnterprises();
    this.getPosts();
  }

  getUsers(){
    this.loadGet = true;
    this.fs.collection('users', ref => ref.where('status','==',true)).valueChanges().subscribe( res => {
      this.listUsers = res as any;
      this.loadGet = false;
    }, err =>{
      console.log(err)
    })
  }

  getUsersdisable(){
    this.loadGetDisable = true;
    this.fs.collection('users', ref => ref.where('status','==',false)).valueChanges().subscribe( res => {
      this.listUsersdisable = res as any;
      this.loadGetDisable = false;
    }, err =>{
      console.log(err)
    })
  }

  getUser(email:string){
    return new Promise ((resolve, reject) => {
      this.fs.collection('users', ref =>  ref.where('user','==',email)).valueChanges().subscribe( res => {
        if(res.length!=0){
          resolve(res[0])
        }else{
          resolve(null);
        }
      }, err => {
        console.log('Error al consultar usuario')
      })
    })
  }

  getEnterprises(){
    this.loadGetenterprise = true;
    this.fs.collection('enterprise', ref => ref.where('estado','==','ACTIVO')).valueChanges().subscribe( res => {
      this.listEnterpise = res as any;
      this.loadGetenterprise = false;
    }, err =>{
      this._msg.errorMsg(err.message,'Error empresa')
    })
  }

  getDesactEnterprises(){
    this.loadDesacEnter = true;
    this.fs.collection('enterprise', ref => ref.where('estado','==','DESACTIVADO')).valueChanges().subscribe( res => {
      this.listEnterpiseDes = res as any;
      this.loadDesacEnter = false;
    }, err =>{
      this._msg.errorMsg(err.message,'Error empresa')
    })
  }
  

  getEnterprise(id:string){
    return new Promise((resolve, reject) => {
      this.enterpriseRef.doc(id).valueChanges().subscribe( res => {
        resolve(res)
      }, err =>{
        reject(err)
      })
    })
  }

  getOneUser(id:string){
    return new Promise ((resolve, reject) => {
      this.fs.collection('users').doc(id).valueChanges().subscribe( res => {
        if(res){
          resolve(res as User)
        }else{
          resolve(null);
        }
      }, err => {
        console.log('Error al consultar usuario')
      })
    })
  }

  getDescriptions(){
    this.loadGetdescript = true;
    this.coverpageRef.valueChanges().subscribe( res => {
      this.listCoverPage = res as any;
      this.loadGetdescript = false;
    }, err =>{
      this.loadGetdescript = false;
      this._msg.errorMsg(err.message,'Error empresa')
    })
  }
  
  getPosts(){
    this.loadGetpost = true;
    this.postRef.valueChanges().subscribe( res => {
      this.listpost = res as any;
      this.loadGetpost = false;
    }, err =>{
      this._msg.errorMsg(err.message,'Error empresa')
      this.loadGetpost = false;
    })
  }

  getPost(id:string){
    return new Promise((resolve, reject) => {
      this.postRef.doc(id).valueChanges().subscribe( res => {
        resolve(res);
      }, err =>{
        this._msg.errorMsg('Error al obtener el post','Error empresa')
      })
    })
  }

  addUser(data:User){
    return new Promise((resolve, reject) => {
      this.userRef.add(data.toObject).then( resDoc => { 
        this.updateId('users',resDoc.id);
        resolve('usuario registrado correctamente');
      }).catch( err => {
        reject('error al registrar usuario')
      })
    })
  }

  addDescripCover(data:any){
    return new Promise((resolve, reject) => {
      this.coverpageRef.add(data).then( resDoc => { 
        this.updateId('coverPage',resDoc.id);
        resolve('Descripción registrada correctamente');
      }).catch( err =>{
        reject('Error al registrar descripción')
      })
    })
  }

  load:boolean = false;
  addPost(data:any){
    this.load = true;
    return new Promise((resolve, reject) => {
      this.postRef.add(data).then( resDoc => { 
        this.load = false;
        this.updateId('post',resDoc.id);
        resolve('Post registrado correctamente');
      }).catch( err =>{
        reject('Error al registrar post')
      })
    })
  }

  addEnterprise(data:any){
    return new Promise((resolve,reject)=>{
      this.enterpriseRef.add(data).then( resDoc => { 
        this.updateId('enterprise',resDoc.id);
        resolve('Empresa de transporte registrado correctamente');
      }, err =>{
        reject('error al registrar empresa de transporte')
      })
    })
  }

  updateUser(data:any){
    return new Promise((resolve, reject) => {
      this.userRef.doc(data.id).update(data).then( res => { 
        resolve('usuario actualizado correctamente');
      }, err =>{
        reject('error al actualizar')
      })
    })
  }

  updateId(doc:string, id:string){
    this.fs.collection(doc).doc(id).update({id:id}).then( res =>{
    }).catch( err => {
      this._msg.warningMsg('err update id doc','actualizar usuario');
    })
  }

  onImage(event:any,rut:number) {

      let dir = '';

      if(rut==1){
        dir = 'user-profile/';
      }

      if(rut==2){
        dir = 'post/';
      }

      if(rut==3){
        dir = 'photo-carriers/';
      }
    
      this.subiedoImg = true;
      const time = new Date().getTime();
      const file = event.target.files[0];
      const ruta = dir+time;
      const ref = this.storage.ref(ruta);
      const task = ref.put(file);

      //verificamos mientras se sube la foto
      task.then((tarea)=>{
          ref.getDownloadURL().subscribe((imgUrl)=>{
            this.imgURL = imgUrl;
            this.subiedoImg = false;
            this.imgauxPost = imgUrl;
            this.porcentajeSFoto = 0;
          })
      })
       //observale de la subida del archivo en %
      task.percentageChanges().subscribe((porcentaje)=>{
          if(porcentaje){
            this.porcentajeSFoto = parseInt(porcentaje.toString(),10)
          }
      })
  }

  verfyUserdb(email:string){

    return new Promise( (resolve, reject) =>{
      this.fs.collection('users', ref => ref.where('user','==',email))
             .valueChanges().subscribe( resEmail => {
              if(resEmail.length!=0){ 
                this.fs.collection('users', ref => ref.where('status','==',true)
                                                      .where('user','==',email)).valueChanges().subscribe( resStatus => {
                  if(resStatus.length!=0){
                    resolve(true)
                  } else {
                    resolve(false);
                    this._auth.signOut();
                    this.ruta.navigateByUrl('login');
                    this._msg.errorMsg('Accesso denegado comuniquese con el administrador','Usuario denegado') 
                  }
                })
              } else {
                resolve(false) 
                this._msg.warningMsg('Password o usuario son incorrectos','Acceso usuario') 
              }
      }, err => {
        reject(err)
      })
    })

  }

  Userdb(email:string){
    return new Promise( (resolve, reject) =>{
      this.fs.collection('users', ref => ref.where('user','==',email).where('status','==',true) )
             .valueChanges().subscribe( res => {
              if(res.length!=0){ 
                resolve(true) 
              }else{
                resolve(false) 
              }
      }, err => {
        reject(err)
      })
    })
  }

  // update methods
  updateDescription(data:PortDescriotion){
    return new Promise((resolve, reject)=>{
      this.coverpageRef.doc(data.id).update(data.toObject).then( res => {
        resolve('Descripción actualizada correctamente')
      }).catch( err => {
        reject('Error al actualizar descripción')
      })
    })
  }
  
  updateEnterprise(data:any){
    return new Promise((resolve, reject) => {
      this.enterpriseRef.doc(data.id).update(data).then( res => { 
        resolve('Empresa actualizada correctamente');
      }, err =>{
        reject('error al actualizar empresa')
      })
    })
  }

  // delete methods
  deleteDescription(data:PortDescriotion){
    this.coverpageRef.doc(data.id).delete().then( res => {
      this._msg.successMsg('Descripción eliminada correctamente','Eliminar descripción')
    }).catch( err => {
      this._msg.errorMsg('Error al eliminar Descripción','Error eliminar')
    })
  }

  deletePost(id:string){
    this.postRef.doc(id).delete().then( res => {
      this._msg.successMsg('Post eliminado correctamente','Eliminar post')
    }).catch( err => {
      this._msg.errorMsg('Error al eliminar Post','Error eliminar')
    })
  }

  statusEnterprise(id:string,status:string){
    return new Promise((resolve, reject) => {
      this.enterpriseRef.doc(id).update({estado:status}).then( res => {
        if(status=='ACTIVO'){ resolve('Empresa activada correctamente') }
        else { resolve('Empresa desactivada correctamente') }
      }).catch( err => {
        reject(err.message)
      })
    })
  }

  searchEnterprise(ruc:string){
    return new Promise( (resolve, reject) =>{
      this.fs.collection('enterprise', ref => ref.where('ruc','==',ruc))
             .valueChanges().subscribe( res => {
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

  selectEntrerprise(data:any){
    console.log("hola")
    console.log(data)
  }

}
