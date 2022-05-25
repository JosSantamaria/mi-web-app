import { Injectable } from "@angular/core";
import { Autor } from "./autor.model";

//Hcemos el servicio de autores inyectable desde la raiz del proyecto (global)
//sin necesidad de exportar en el app.module
@Injectable({
providedIn: 'root'
})


export class AutoresService {

  private autoresLista: Autor[] = [
    { autorId: 1, nombre: 'Vaxi', apellido: 'Drez', gradoAcademico: 'Ingeniero de software' },
    { autorId: 2, nombre: 'Fernando', apellido: 'Herrera', gradoAcademico: 'Maestria Angular' },
    { autorId: 3, nombre: 'Lorenzo', apellido: 'Ramirez', gradoAcademico: 'Matematico' },
    { autorId: 4, nombre: 'Juan', apellido: 'Alvarez', gradoAcademico: 'Ciencias de la Computacion' }
  ];


  obtenerAutores() {
    return this.autoresLista.slice();
  }


}
