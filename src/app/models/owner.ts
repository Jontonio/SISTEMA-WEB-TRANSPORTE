
export class Owner{
    id: string;
    ID_card: string;
    firts_name: string;
    father_last_name: string;
    mother_last_name: string;
    status: boolean;
    URL_photo: string;
    celphone: string;
    email: string;
    update_at: number;
    created_at: number;

    constructor(ID_card: string,
                firts_name: string,
                father_last_name: string,
                mother_last_name: string,
                URL_photo: string,
                celphone: string,
                email: string){

        this.id = '';
        this.ID_card = ID_card;
        this.firts_name = firts_name;
        this.father_last_name = father_last_name;
        this.mother_last_name = mother_last_name;
        this.status = true;
        this.URL_photo = URL_photo;
        this.celphone = celphone;
        this.email = email;
        this.update_at = new Date().getTime();
        this.created_at = new Date().getTime();
    }

    setId(id:string){
        this.id = id
    }

    get toObject(){
        return{
            id: this.id,
            ID_card: this.ID_card,
            firts_name: this.firts_name,
            father_last_name: this.father_last_name,
            mother_last_name: this.mother_last_name,
            status: this.status,
            URL_photo: this.URL_photo,
            celphone: this.celphone,
            email: this.email,
            update_at: this.update_at,
            created_at: this.created_at
        }
    }
}