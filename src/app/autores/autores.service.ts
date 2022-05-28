import { Subject } from 'rxjs';
import { HttpClient , HttpClientModule} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Autor } from "./autor.model";
environment

//Hcemos el servicio de autores inyectable desde la raiz del proyecto (global)
//sin necesidad de exportar en el app.module
@Injectable({
providedIn: 'root'
})


export class AutoresService {
  //Propiedades
  baseUrl = environment.baseUrl; //Url base de la Api: declarada en environments.ts
  private autoresLista: Autor[] = [];
  private autoresSubject = new Subject<Autor[]>();

  //Inyeccion de dependencias
  constructor(private http:HttpClient) //importamos el http client para hacer las consultas a la API
  {  }//importar el HttpClentModule en el app.module

  //Metodos del servicio
  obtenerAutores() { //las comunicaciones entre angular y el server son asincronas, usamos observables, subjects
   
    this.http.get<Autor[]>(this.baseUrl + 'api/LibreriaAutor/')
    .subscribe( (data) => {
      this.autoresLista = data;
      this.autoresSubject.next([...this.autoresLista]); //next: refresca la data y la muestra #operador spread
    });
    // return this.autoresLista.slice();
  }

  obtenerActuaListener()
  {
    return this.autoresSubject.asObservable();
  }

}
