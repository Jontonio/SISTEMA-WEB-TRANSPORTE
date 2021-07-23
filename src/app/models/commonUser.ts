export class commonUser{
    
    displayName?:string
    email?:string
    photoURL?:string
    uid?:string

    constructor(displayName:string, email:string, photoURL:string, uid:string){
        this.displayName = displayName
        this.email = email
        this.photoURL = photoURL
        this.uid = uid
    }
}