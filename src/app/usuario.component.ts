import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent  {

  usuarios = ['Luis','Fernando','Maria'];
  usuarioNombre = "";
  visible : boolean = false;

  constructor()
  {
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.visible = true;
 }, 3000);
  }

  onAgregarUsuario()
  {
    this.usuarios.push(this.usuarioNombre);
  }

}
