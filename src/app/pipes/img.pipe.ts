import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(value:any): string {
    if(value){
      return value;
    }
    return 'assets/img/img-user/default-user.png';
  }

}
