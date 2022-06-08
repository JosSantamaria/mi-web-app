import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Usuario } from "./usuario.model";
import { LoginData } from "./login-data.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable(  //solventamos error en los providers de la instancia para Router ('rxjs:Router')
{
  providedIn: "root"
})

export class SeguridadService
{
    private token:string;
    baseUrl = environment.baseUrl;

      seguridadCambio = new Subject<boolean>();

      private usuario:Usuario;

      recuperaToken(){ //recupera el token del localStorage y capturamos el evento reload (actualizar la pagina)
        const tokenBrowser = localStorage.getItem('token');
        if(!tokenBrowser){
          return;
        }
        
          this.token = tokenBrowser;
          this.seguridadCambio.next(true);
        //
          this.http.get<Usuario>(this.baseUrl + 'usuario')
          .subscribe( (response) => {console.log('login respuesta ', response)

          this.token = response.token;
          this.usuario = {
            email:response.email,
            usuarioId: response.usuarioId,
            nombre:response.nombre,
            apellidos:response.apellidos,
            username:response.username,
            password:'',
            token:response.token
          };
          
          this.seguridadCambio.next(true); //Iniciamos el observable en true para iniciar la sesion despues del login
          localStorage.setItem('token',response.token);//almacenamos el token en el localStorage del navegador
        });

      }

      obtenerToken() : string {
        return this.token;
      }

      constructor(private router:Router, private http:HttpClient){}

      registrarUsuario(usr:Usuario)
      {
        this.usuario = {
          email:usr.email,
          usuarioId: Math.round(Math.random() * 10000 ).toString(),
          nombre:usr.nombre,
          apellidos:usr.apellidos,
          username:usr.username,
          password:'',
          token:''
        };

        this.seguridadCambio.next(true); //Iniciamos el observable en true para iniciar la sesion despues del registro
        this.router.navigate(['/']); //Navegamos a la pagina principal con el elmento router
      }

      login(loginData:LoginData)
      {
        //Obtenemos la respuesta del servidor , escuchamos la espuesta y obtenemos el token
        this.http.post<Usuario>(this.baseUrl + 'usuario/login',loginData)
          .subscribe( (response) => {console.log('login respuesta ', response)

          this.token = response.token;
          this.usuario = {
            email:response.email,
            usuarioId: response.usuarioId,
            nombre:response.nombre,
            apellidos:response.apellidos,
            username:response.username,
            password:'',
            token:response.token
          };
          
          this.seguridadCambio.next(true); //Iniciamos el observable en true para iniciar la sesion despues del login
          localStorage.setItem('token',response.token);//almacenamos el token en el localStorage del navegador
          this.router.navigate(['/']);
        });
      }

      salirSesion()
      {
        this.usuario = null;
        this.seguridadCambio.next(false);//cerramos sesion y enviamos false al observable seguridadCambio
        localStorage.removeItem('token');//eliminamos el token del localStorage
        this.router.navigate(['/login']);

      }


      obtenerUsuario()
      {
        return {...this.usuario};
      }

      onSesion(){
        return this.token != null;
      }
}
