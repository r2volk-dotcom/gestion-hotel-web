import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { EmpleadoService } from './componentes/empleados/empleado.service';

// Este guard protege las rutas del sistema para que nadie entre sin iniciar sesión
export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos el servicio de empleados y el enrutador
  const empleadoService = inject(EmpleadoService);
  const router = inject(Router);

  // Intentamos obtener el usuario actual desde el sessionStorage
  const usuarioLogueado = empleadoService.obtenerUsuarioActual();

  // Si el usuario existe (sesión iniciada)
  if (usuarioLogueado != null) {
    // Permitimos que el usuario acceda a la página
    return true;
  } else {
    // Si no ha iniciado sesión, lo redirigimos a la pantalla de login
    router.navigate(['/login']);
    // Bloqueamos el acceso a la ruta solicitada
    return false;
  }
};
