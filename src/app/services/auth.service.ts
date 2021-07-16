import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from '../models/user';
import { DatabaseService } from './database.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // sesión con rest api
  url    : string = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  apiKey : string = 'AIzaSyBMmlDoes6AYQ5inG33o6StCM7S4EFUzoQ'
  vista  : boolean = false;
  hiddenReset: boolean = false;
  loadding: boolean = false;
  userActive: User;
  loadUser  :boolean = false;
  message: string = "Cargando";

  constructor(public auth: AngularFireAuth, 
              private ruta: Router, 
              private http:HttpClient, 
              private fs:AngularFirestore, 
              private _msg:MessagesService,
              private _db:DatabaseService) {
    this.isActiveUser().subscribe( (res:any) => {
      if(res){
        this._db.getUser(res.email).then( res =>{
          if(res){
            this.userActive = res as any;
            this.loadUser = true;
          }
        })
        this.vista = true;
      }
    }, err => { console.log(err) });
  }

  loggin(email:string, password:string){
    this.loadding = true;
    return new Promise( (resolve, reject) =>{
      this._db.verfyUserdb(email).then( v => {
        if(v){
          this.auth.signInWithEmailAndPassword(email, password ).then( res =>{
            this.ruta.navigateByUrl('panel-admin/dashboard');
            this.loadding = false;
            resolve(true);
          }).catch( err =>{
            this.loadding = false;
            reject(err);
          })
        }else{
          this.loadding = false;
        }
      }).catch( err =>{
        console.log(err)
      })
    })
  }

  logout(){
    return new Promise( (resolve, reject) =>{
      this.auth.signOut().then( res =>{
        resolve('user singOut')
      }).catch( err =>{
        reject(err)
      })
    })
  }
  
  signInGoogle(){
    return this.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider()); 
  }

  createUserAPI(data:User){
    return new Promise( (resolve, reject) =>{
      const user = { email:data.user, password:data.ID_card, returnSecureToken:true }
      this.http.post(`${this.url}signUp?key=${this.apiKey}`, user).subscribe( res => {
        resolve('Usuario registrado correctamente')
      }, err => {
        reject('algo salio mal')
        this._msg.errorMsg('Error al crear usuario','crear usuario')
      })
    })
  }

  updateStatusUser(collec:string, idDoc:string, st:boolean){
   return new Promise( (resolve,reject) =>{
    this.fs.collection(collec).doc(idDoc).update({status:st}).then( res =>{
      resolve(true)
    }).catch( err => {
      this._msg.errorMsg('Error al actualizar status','Estatus usuario')
    })
   })
  }
  
  resetPassword(email:string){
    return this.auth.sendPasswordResetEmail(email);
  }
  
  isActiveUser(){
    return this.auth.authState;
  }

  seeLoggin(){
    return new Promise( (resolve, reject) => {
      this.auth.authState.subscribe( res => {
        if(res) { 
          resolve(true); 
        }else {
          resolve(false);
        }
      }, err =>{
        reject(err);
      })
    })
  }

}
