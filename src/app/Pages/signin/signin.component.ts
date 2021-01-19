import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/Service/validators.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  forma:FormGroup;

  constructor( private fb: FormBuilder, private validadores: ValidatorsService) { 
    this.Crearformulario();
  }

  ngOnInit(): void {
  }
  get correoNovalido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get nombreNovalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get passNovalido(){
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }
  get passconfirmNovalido(){
    const pass1val= this.forma.get('pass').value;
    const pass2val= this.forma.get('passconfirm').value;
    return (pass1val===pass2val)? false:true;
  }
  Crearformulario(){
    this.forma= this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(5)]],
      correo:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass:['', [Validators.required, Validators.minLength(6)]],
      passconfirm:['', [Validators.required,  Validators.minLength(6)]],
    },{validators: this.validadores.passwordiguales('pass','passconfirm') });
  }
  Login(){
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control=>{
          control.markAllAsTouched();
      });
    }else{
      console.log(this.forma.value);
    }

  }

}
