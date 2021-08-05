import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _snackBar: MatSnackBar, private _ts:ToastrService) {}

  messageMaterial(mensaje:string) {
    this._snackBar.open(mensaje,'',{
      duration:4000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }

  successMsg(body:string,title:string, ){
    this._ts.success(body,title,{positionClass:'toast-bottom-center'})
  }
  warningMsg(body:string,title:string,){
    this._ts.warning(body,title,{positionClass:'toast-bottom-center'})
  }
  errorMsg(body:string,title:string){
    this._ts.error(body,title,{positionClass:'toast-bottom-center'})
  }

}
