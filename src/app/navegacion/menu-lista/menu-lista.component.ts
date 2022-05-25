import { Component, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter<void>();

  estadoUsuario:boolean;
  usuarioSubscription:Subscription;

  constructor(private seguridadService:SeguridadService) { }

  ngOnInit(): void {
    this.usuarioSubscription = this.seguridadService.seguridadCambio.subscribe( status => {
      this.estadoUsuario = status; //recibimos el estado de la sesion
  });
}

  onCerrarMenu(){
    this.menuToggle.emit(); //cierra el derecho lateral
  }

  terminarSesionMenu()
  {
    this.onCerrarMenu();
    this.seguridadService.salirSesion();

  }

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

}
