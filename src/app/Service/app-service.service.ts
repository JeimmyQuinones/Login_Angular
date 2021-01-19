import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
usertoken:string;

  constructor(private http:HttpClient) { 
    this.leertoken();

  }
  private url='https://localhost:44377/Api/';
  Login(Model:any){
    return this.http.post(this.url+'Account/Login',Model).pipe(map(
      resp=>{
        this.guardartoken(resp.toString());
        let hoy =new Date();
        hoy.setSeconds(60);
        
      localStorage.setItem('expira',hoy.getTime().toString());
        return resp.toString();
      }
    ));
  }
  logout(){
    localStorage.removeItem('token');
  }

  private guardartoken(idtoken:string){
    if(idtoken!="Usuario no valido"){
      this.usertoken=idtoken;
      localStorage.setItem('token',idtoken);
    }
  }
  leertoken(){
    if(localStorage.getItem('token')){
      this.usertoken= localStorage.getItem('token');
    }else{
      this.usertoken="";
    }
    return this.usertoken;
  }
  estaautenticado():boolean{
    if(this.usertoken.length<2)
    {
      return  false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const espiradate = new Date();
    espiradate.setTime(expira);
    if(espiradate>new Date()){
      return true;
    }else{
      return false;
    }
  }
}
