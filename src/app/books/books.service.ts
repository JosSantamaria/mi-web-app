import { Subject } from 'rxjs';
import {Books} from './books.model';

export class BooksService {

  bookLista: Books[] =
    [
          {libroId:1,titulo:'Algoritmos Basicos',descripcion:'Libro basico de algoritmos', autor:'Vaxi Drez',precio:18},
          {libroId:2,titulo:'Angular',descripcion:'Libro Intermedia/Avanzado', autor:'Fernando Herrera',precio:25},
          {libroId:3,titulo:'ASP.NET',descripcion:'Master en C# y ASP', autor:'Juan Arrevalo',precio:30},
          {libroId:4,titulo:'Java',descripcion:'Java es raro', autor:'John Cena',precio:99}
    ];

    bookSubject = new Subject<Books>();


    //Metodo para obtener todos los libros
    obtenerLibros(){
      return this.bookLista.slice()
    }

    guardarLibro(book:Books){

      this.bookLista.push(book); //introduimos al arreglo y retornamos el arreglo nuevo
      this.bookSubject.next(book); //estamos atentos a este evento
    }
}
