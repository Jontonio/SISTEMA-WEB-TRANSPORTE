
export class Valoration{
    comment:string;
    valoration: number;
    dateComent:number;
    userName:string;
    photo:string;
    email:string;

    constructor(comment:string, valoration:number, userName:string,photo:string, email:string){
        this.comment = comment;
        this.valoration = valoration;
        this.dateComent = new Date().getTime();
        this.userName = userName;
        this.photo = photo;
        this.email = email;
    }

    getvaloration(){
        if(this.valoration){
            return this.valoration;
        }
        return 0;
    }
    getcomment(){
        if(this.comment){
            return this.comment;
        }
        return 'sin comentarios';
    }
    getdateComent(){
        if(this.dateComent){
            return this.dateComent;
        }
        const date = new Date().getTime();
        return date;
    }
    getuserName(){
        if(this.userName){
            return this.userName;
        }
        return 'Anómimo';
    }
    getphoto(){
        if(this.photo){
            return this.photo;
        }
        return '';
    }
    getemail(){
        if(this.email){
            return this.email
        }
        return 'fakeemail@gmail.com'
    }

    get toObject(){
        return {
            comment: this.getcomment(),
            valoration: this.getvaloration(), 
            dateComent: this.getdateComent(),
            userName: this.getuserName(),
            photo:this.getphoto(),
            email: this.getemail(),
        }
    }
}