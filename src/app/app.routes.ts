import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES:Routes=[
    {path:'Login', component:LoginComponent},
    {path:'Home', component:HomeComponent , canActivate:[AuthGuard]},
    {path:'Signin', component:SigninComponent },
    {path:'**', redirectTo:'Login' }
];

export const App_routing = RouterModule.forRoot(APP_ROUTES);