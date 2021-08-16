import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enterpriseCar'
})
export class EnterpriseCarPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (!texto) return lista;
    return lista.filter(car => car.idEmpresa.toLowerCase().includes(texto.toLowerCase()) )
  }

}
