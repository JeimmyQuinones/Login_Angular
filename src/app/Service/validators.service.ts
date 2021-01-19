import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }
  passwordiguales(pass1val:string,pass2val:string){
    return ( fromGroup: FormGroup)=>{
        const pass1control= fromGroup.controls[pass1val];
        const pass2control= fromGroup.controls[pass2val];
        if(pass1control.value===pass2control.value){
          pass2control.setErrors(null);
        }else{
          pass2control.setErrors({noEsigual:true});
        }
    }
}
}
