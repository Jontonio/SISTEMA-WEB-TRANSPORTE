
export class Valoration{
    comment:string;
    valoration: number;
    dateComent:Date;
    userName:string;
    photo:string;
    email:string;

    constructor(comment:string, valoration:number, userName:string,photo:string, email:string){
        this.comment = comment;
        this.valoration = valoration;
        this.dateComent = new Date();
        this.userName = userName;
        this.photo = photo;
        this.email = email;
    }

    get toObject(){
        return {
            comment: this.comment,
            valoration: this.valoration, 
            dateComent: this.dateComent,
            userName: this.userName,
            photo:this.photo,
            email: this.email,
        }
    }
}