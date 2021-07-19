import { Valoration } from "./valoration"

export class Car{
    placa:string
    serie:string
    modelo:string
    color:string
    fotoConductor:string
    idEmpresa:string
    targetaCirculacion: string
    soyConductor:string
    valoration: Object[];

    dniconductor?: string
    nombresConductor?: string
    apellidoPaterno?: string
    apellidoMaterno?: string
    estadoConductor?: string

    constructor(placa:string, 
                serie:string, 
                modelo:string, 
                color:string, 
                foto:string, 
                idEmpresa:string, 
                targetaCirculacion:string,
                soyConductor:string,
                dniconductor?:string,
                nombresConductor?:string,
                apellidoPaterno?:string,
                apellidoMaterno?:string,
                estadoConductor?:string){

        this.placa = placa;
        this.serie = serie;
        this.modelo = modelo;
        this.color = color;
        this.fotoConductor = foto;
        this.idEmpresa = idEmpresa;
        this.targetaCirculacion = targetaCirculacion;
        this.soyConductor = soyConductor;
        this.valoration = [];

        this.dniconductor = dniconductor;
        this.nombresConductor = nombresConductor;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.estadoConductor = estadoConductor;
    }


}
        