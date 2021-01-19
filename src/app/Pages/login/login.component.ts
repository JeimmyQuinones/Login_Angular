import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { AppServiceService } from 'src/app/Service/app-service.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma:FormGroup;
  recordarme=false;
  constructor(private fb: FormBuilder, private Modelservice:AppServiceService, private router:Router) {
    this.Crearformulario();
   }

  ngOnInit(): void {
  }
  get correoNovalido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get passNovalido(){
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }
  Crearformulario(){
    this.forma= this.fb.group({
      correo:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass:['', [Validators.required, Validators.minLength(6)]],
    });
  }
  Login(){
    
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control=>{
          control.markAllAsTouched();
      });
    }else{
      Swal.fire({
        allowOutsideClick:false,
        text: 'Espere por favor...',
        icon: 'info',
      });
      Swal.showLoading();
      let model={
        Username: this.forma.value.correo, 
        Password: this.forma.value.pass
      }
      this.Modelservice.Login(model).subscribe(resp=>{
        if(resp=="Usuario no valido"){
          Swal.fire({
            text: 'Usuario o contraseña invalida',
            icon: 'error',
          });
        }else{
          this.router.navigateByUrl('/Home');
          Swal.close();
          
        }
      },(err)=>{

        Swal.fire({
          text: 'Usuario o contraseña invalida',
          icon: 'error',
        });
             
      });
    }
  }

}
