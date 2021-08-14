import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarCar'
})
export class BuscarCarPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {
    if (!texto) return lista;
    return lista.filter(car => car.placa.toLowerCase().includes(texto.toLowerCase()) )
  }

}
