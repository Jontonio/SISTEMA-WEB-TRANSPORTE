export class Post{
    id:string;
    url:string;
    date:number;
    constructor(url:string){
        this.id = '';
        this.url = url;
        this.date = new Date().getTime();
    }

    get toObject(){
        return {
            id:this.id,
            url:this.url,
            date: this.date
        }
    }
}