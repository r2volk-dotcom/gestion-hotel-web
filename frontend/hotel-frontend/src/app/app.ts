import { Component} from '@angular/core'; // necesario de Angular
import { Habitaciones } from './componentes/habitaciones/habitaciones';
import { Clientes } from './componentes/clientes/clientes';
import { Reservas } from './componentes/reservas/reservas';

// define el componente principal
@Component({
  selector: 'app-root', // nombre del componente
  imports: [Habitaciones, Clientes, Reservas],
  templateUrl: './app.html', // html que usa
  styleUrl: './app.css' // estilos
})

export class App {
  // este componente solo muestra los componentes hijos
}
