import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Inyeccion del servicio de seguridad
  constructor(private seguridadService:SeguridadService) { }



  ngOnInit(): void {
  }

  loginUsuario(f:NgForm)
  {
    this.seguridadService.login({
      email:f.value.email,
      password:f.value.password
    });
  }

}
