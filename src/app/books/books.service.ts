import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Books} from './books.model';
import { PaginationBooks } from './pagination-book.model';

//hacemos global el servicio
@Injectable({
  providedIn: 'root'
})


export class BooksService {

  private bookLista: Books[] = [];
    baseUrl = environment.baseUrl;
    bookSubject = new Subject<void>(); //creamos el observable con subject de tipo books, evalua la respuesta del servidor
    bookPagination:PaginationBooks; //instanciacion del interface paginationBooks
    bookPaginationSubject = new Subject<PaginationBooks>();

    constructor(private http:HttpClient){}

    //Metodo para obtener todos los libros
    obtenerLibros(LibrosPorPagina:number,paginaActual:number,sort:string,sortDirection:string,filterValue:any){
      const request = { //creamos el objeto request (objeto que se obtendra en la peticion)
        pageSize:LibrosPorPagina,
        page:paginaActual,
        sort,
        sortDirection:sortDirection,
        filterValue:filterValue
      };

      //Obtener Paginacion
      this.http.post<PaginationBooks>( this.baseUrl + 'api/Libro/Pagination', request)
      .subscribe( (response) => { 
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);

      });
    }

    obtenerActualListener()
    {
      return this.bookPaginationSubject.asObservable();
    }

    guardarLibro(book:Books){
      //this.bookLista.push(book); //introduimos al arreglo y retornamos el arreglo nuevo
      
      this.http.post(this.baseUrl + 'api/Libro',book)
        .subscribe(response => {
          this.bookSubject.next(); 
        });
    }

    guardarLibroListener(){
      return this.bookSubject.asObservable();
    }
}
