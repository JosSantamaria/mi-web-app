import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class LibrosService {

  librosSubject = new Subject();

  private libros = ['Libro Js', 'JavaScript Elocuente', 'WoW'];

  agregarLibros(libroNombre: string) {
    this.libros.push(libroNombre);
    this.librosSubject.next(libroNombre);
  }

  eliminarLibro(libroNombre: string)
  {
    this.libros = this.libros.filter(x => x !== libroNombre);//Nuevo arreglo (debe ser diferente al anterior)
    this.librosSubject.next(libroNombre);
  }

  public obtenerLibros() {
    return [...this.libros];
  }
}
