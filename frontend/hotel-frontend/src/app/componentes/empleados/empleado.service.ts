import { Injectable } from '@angular/core';
import { Empleado } from '../../models';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root',
})
// Servicio para gestionar peticiones de empleados
export class EmpleadoService {

  // Obtiene la lista completa de empleados
  async obtenerEmpleados(): Promise<Empleado[]> {
    const respuesta = await fetch(`${API_BASE_URL}/empleados`);
    return await respuesta.json();
  }

  // Registra un nuevo empleado en el backend
  async crearEmpleado(nuevoEmpleado: Empleado): Promise<Empleado> {
    const respuesta = await fetch(`${API_BASE_URL}/empleados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoEmpleado)
    });
    return await respuesta.json();
  }

  // Actualiza los datos de un empleado existente
  async actualizarEmpleado(id: number, empleadoEditado: Empleado): Promise<Empleado> {
    const respuesta = await fetch(`${API_BASE_URL}/empleados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(empleadoEditado)
    });
    return await respuesta.json();
  }

  // Elimina un empleado por su ID
  async eliminarEmpleado(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/empleados/${id}`, {
      method: 'DELETE'
    });
  }

  // Envía las credenciales al backend para hacer login
  async login(usuario: string, contrasena: string): Promise<Empleado> {
    console.log('Iniciando peticion de login para el usuario:', usuario);
    const respuesta = await fetch(`${API_BASE_URL}/empleados/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, contrasena })
    });

    console.log('Respuesta de login recibida. Status:', respuesta.status, 'Ok:', respuesta.ok);

    // Si la respuesta no es correcta (código de error)
    if (respuesta.ok == false) {
      let errorData: any = null;
      try {
        errorData = await respuesta.json();
        console.log('Cuerpo de error JSON parseado:', errorData);
      } catch (jsonErr) {
        console.warn('La respuesta de error no contiene un JSON valido:', jsonErr);
      }
      
      // Si el servidor nos dio un mensaje de error detallado
      if (errorData && errorData.message != null) {
        throw new Error(errorData.message);
      } else {
        throw new Error('Usuario o contraseña incorrectos');
      }
    }

    // Si todo salió bien, retornamos el empleado obtenido
    const empleado = await respuesta.json();
    console.log('Usuario logueado con exito:', empleado);
    return empleado;
  }

  // Guarda los datos del empleado logueado en sessionStorage
  guardarSesion(empleado: Empleado): void {
    const empleadoComoTexto = JSON.stringify(empleado);
    sessionStorage.setItem('usuario_sesion', empleadoComoTexto);
  }

  // Obtiene el empleado logueado actualmente
  obtenerUsuarioActual(): Empleado | null {
    const sesion = sessionStorage.getItem('usuario_sesion');
    
    // Si la sesión existe en el navegador
    if (sesion != null) {
      const empleado = JSON.parse(sesion);
      return empleado;
    } else {
      // Si no hay sesión iniciada, retornamos null
      return null;
    }
  }
  
  // Cierra la sesión y limpia el almacenamiento
  cerrarSesion(): void {
    sessionStorage.removeItem('usuario_sesion');
  }
}
