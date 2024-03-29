import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from './autor.model';
import { AutoresService } from './autores.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit, OnDestroy{

  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();
  private autorSubscription: Subscription;
  constructor( private autoresService: AutoresService ) { }

  ngOnInit(): void {
   this.autoresService.obtenerAutores();
   this.autorSubscription = this.autoresService
   .obtenerActuaListener()
    .subscribe( (autores: Autor[]) => {
      this.dataSource.data = autores;
    }) 
    // this.dataSource.data = this.autoresService.obtenerActuaListener;
  }

  ngOnDestroy()
  {
    this.autorSubscription.unsubscribe(); //cerramos la subscripcion al destruir o cambiar el componente
  }
}
