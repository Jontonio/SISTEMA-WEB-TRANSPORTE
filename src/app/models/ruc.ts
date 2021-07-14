export class Ruc {
  id:string;
  ruc: string; 
  razonSocial: string; 
  telefonos: any[];
  tipo: string;
  estado: string;
  direccion: string;
  departamento: string; 
  provincia: string; 
  distrito: string;
  descripcion: string;
  
  constructor( 
    ruc: string, 
    razonSocial: string, 
    telefonos: any[],
    tipo: string,
    estado: string,
    direccion: string,
    departamento: string, 
    provincia: string, 
    distrito: string,
    descripcion:string){
    this.id = ''
    this.ruc = ruc 
    this.razonSocial = razonSocial 
    this.telefonos = telefonos
    this.tipo = tipo
    this.estado = estado
    this.direccion = direccion
    this.departamento = departamento 
    this.provincia = provincia 
    this.distrito = distrito
    this.descripcion = descripcion
  }
  
  // getters
  getid(){
    return this.id;
  }

  getruc(){
    return this.ruc;
  }
  
  getestado(){
    return this.estado;
  }

  getPhone(){
    let list = '';
    if(Array.isArray(this.telefonos) && this.telefonos.length>=1){
      list = this.telefonos[0];
    }else{
      list = 'sin telefono'
    }
    return list;
  }

  getrazonSocial(){
    if(!this.razonSocial){
      return 'Sin razón social';
    }
    return this.razonSocial;
  }

  gettipo(){
    if(!this.tipo){
      return 'Sin tipo';
    }
    return this.tipo;
  }

  getdireccion(){
    if(!this.direccion){
      return 'Sin dirección';
    }
    return this.direccion;
  }

  getdepartamento(){
    if(!this.departamento){
      return 'Sin departamento';
    }
    return this.departamento;
  }

  getprovincia(){
    if(!this.provincia){
      return 'Sin provincia';
    }
    return this.provincia;
  }

  getdistrito(){
    if(!this.distrito){
      return 'Sin distrito';
    }
    return this.distrito;
  }

  getdescripcion(){
    if(!this.descripcion){
      return 'Descripción de la empresa';
    }
    return this.descripcion;
  }

}