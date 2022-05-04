import { Component, OnDestroy, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styles: [],
})
export class LibrosComponent implements OnInit, OnDestroy {
  //libros = ['Angular ','C# Patron Repository','Entity Freamework Core','Algoritmos Basicos']
  libros = [];
  private libroSubscription: Subscription;

  constructor(private librosService: LibrosService) {}

  eliminarLibro(libro) {}

  guardarLibro(f) {
    if (f.valid) {
      this.librosService.agregarLibros(f.value.nombreLibro)
    }
  }

  ngOnInit(): void {
    this.libros = this.librosService.obtenerLibros();
    this.libroSubscription =  this.librosService.librosSubject.subscribe( () =>{
      this.libros = this.librosService.obtenerLibros();
    });
  }

  ngOnDestroy(): void {
    this.libroSubscription.unsubscribe();
  }
}
