import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppServiceService } from '../Service/app-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private aut:AppServiceService ,private router:Router ){

  }
  canActivate():boolean{
    if(this.aut.estaautenticado()){
      return true;
    }else{
      this.router.navigateByUrl('/Login');
      return false;
    }

    
  }
  
}
