export class PortDescriotion{

    id:string;
    title:string;
    description:string;
    dateDescription:number;

    constructor(title:string, description:string){
        this.id = '';
        this.title = title;
        this.description = description;
        this.dateDescription = new Date().getTime();
    }

    // et methods
    setId(id:string){
        this.id = id;
    }

    get toObject(){
        return {
            id:this.id,
            title:this.title,
            description:this.description,
            dateDescription: this.dateDescription
        }
    }
    
}