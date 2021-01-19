import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/Service/app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router:Router,private aut:AppServiceService ) { }

  ngOnInit(): void {
  }
  salir(){
     this.aut.logout();
     this.router.navigateByUrl('/Login');
  }
}
