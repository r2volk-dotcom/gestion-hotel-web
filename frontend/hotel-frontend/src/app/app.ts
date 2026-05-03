import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // necesario para rutas
import { Habitaciones } from './componentes/habitaciones/habitaciones';
import { Clientes } from './componentes/clientes/clientes';
import { Reservas } from './componentes/reservas/reservas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
