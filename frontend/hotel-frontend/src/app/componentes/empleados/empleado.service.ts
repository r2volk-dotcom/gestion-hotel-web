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
}
