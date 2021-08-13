import { Pipe, PipeTransform } from '@angular/core';
import { Owner } from '../models/owner';

@Pipe({
  name: 'searchCarrier'
})
export class BuscarCarrierPipe implements PipeTransform {

  transform(lista: Owner[], texto: string): Owner[] {
    if (!texto) return lista;
    return lista.filter(apoderado => (
                        apoderado.ID_card.toLowerCase().includes(texto.toLowerCase()) || 
                        apoderado.firts_name.toLowerCase().includes(texto.toLowerCase())) )
  }
}
