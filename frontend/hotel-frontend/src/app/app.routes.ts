import { Routes } from '@angular/router';
import { Habitaciones } from './componentes/habitaciones/habitaciones';
import { Clientes } from './componentes/clientes/clientes';
import { Reservas } from './componentes/reservas/reservas';

// define las rutas de la aplicación, cada una carga un componente diferente
export const routes: Routes = [
  { path: '', redirectTo: 'habitaciones', pathMatch: 'full' }, // redirige al inicio
  { path: 'habitaciones', component: Habitaciones }, // ruta de habitaciones
  { path: 'clientes', component: Clientes },          // ruta de clientes
  { path: 'reservas', component: Reservas },          // ruta de reservas
  { path: 'pestana1', component: Habitaciones },      // pestaña vacía 1
  { path: 'pestana2', component: Habitaciones },      // pestaña vacía 2
];
