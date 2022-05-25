import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter();

  estadoUsuario:boolean;
  usuarioSubscription:Subscription;

  constructor(private seguridadServicio : SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadServicio.seguridadCambio.subscribe( status => {
      this.estadoUsuario = status; //recibimos el estado de la sesion
    });

  }

  onmenuToggleDispatch() {
    this.menuToggle.emit();
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }

  terminarSesion(){

    this.seguridadServicio.salirSesion();

  }
}
