import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { BooksComponent } from './books/books.component';
import { InicioComponent } from './inicio.component';
import { LibrosComponent } from './libros/libros.component';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { SeguridadRouter } from './seguridad/seguridad.router';

const routes: Routes = [
  //routing
  {path: '', component: InicioComponent, canActivate: [SeguridadRouter] },
  {path: 'libros', component: LibrosComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'books', component: BooksComponent, canActivate: [SeguridadRouter]}, //agragamos canActivate para que solo pueda acceder a este componente si esta logueado
  {path: 'autores', component: AutoresComponent, canActivate: [SeguridadRouter]} //si perdemos la sesion, no podremos acceder a este componente

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[SeguridadRouter]
})
export class AppRoutingModule {}
