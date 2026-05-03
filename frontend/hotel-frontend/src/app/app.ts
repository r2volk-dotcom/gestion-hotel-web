// importa el decorador Component desde Angular
import { Component } from '@angular/core';
// importa modulos de enrutamiento: RouterOutlet, RouterLink, RouterLinkActive
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// decorador que define el componente principal de la app
@Component({
  selector: 'app-root',              // etiqueta HTML para usar este componente
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // modulos necesarios
  templateUrl: './app.html',         // archivo de plantilla HTML
  styleUrl: './app.css'              // archivo de estilos CSS
})
// clase principal del componente de la aplicacion
export class App {
  // el componente no tiene logica, solo sirve como layout
}
