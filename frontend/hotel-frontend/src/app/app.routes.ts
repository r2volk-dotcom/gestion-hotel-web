import { Routes } from '@angular/router';
import { Habitaciones } from './componentes/habitaciones/habitaciones';
import { Clientes } from './componentes/clientes/clientes';
import { Reservas } from './componentes/reservas/reservas';
import { Pagos } from './componentes/pagos/pagos';
import { GestionHabitaciones } from './componentes/gestion-habitaciones/gestion-habitaciones';
import { Empleados } from './componentes/empleados/empleados';
import { Login } from './login/login';
import { authGuard } from './auth.guard';

// define las rutas de la aplicación, cada una carga un componente diferente
export const routes: Routes = [
  { path: '', redirectTo: 'habitaciones', pathMatch: 'full' }, // redirige al inicio
  { path: 'login', component: Login },                          // ruta de login (PÚBLICA)
  
  // Rutas protegidas por el guard de autenticación
  { path: 'habitaciones', component: Habitaciones, canActivate: [authGuard] },
  { path: 'gestionHabitaciones', component: GestionHabitaciones, canActivate: [authGuard] },
  { path: 'clientes', component: Clientes, canActivate: [authGuard] },
  { path: 'reservas', component: Reservas, canActivate: [authGuard] },
  { path: 'empleados', component: Empleados, canActivate: [authGuard] },
  { path: 'pagos', component: Pagos, canActivate: [authGuard] },
];
