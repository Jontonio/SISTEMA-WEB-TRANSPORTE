export class Post{
    id:string;
    url:string;
    date:Date;
    constructor(url:string){
        this.id = '';
        this.url = url;
        this.date = new Date();
    }

    get toObject(){
        return {
            id:this.id,
            url:this.url,
            date: this.date
        }
    }
}