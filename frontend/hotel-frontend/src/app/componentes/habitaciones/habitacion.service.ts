import { Injectable } from '@angular/core';
import { Habitacion } from '../../models';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root',
})
export class HabitacionService {

    async obtenerHabitaciones(): Promise<Habitacion[]>{
      const respuesta = await fetch(`${API_BASE_URL}/habitaciones`);
      return await respuesta.json();
    }
  
    async guardarHabitacion(habitacion: Habitacion): Promise<Habitacion[]> {
      const respuesta = await fetch(`${API_BASE_URL}/habitaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(habitacion)
      });
      return await respuesta.json();
    }
  
    async actualizarHabitacion(id: number, habitacion: Habitacion): Promise<Habitacion[]> {
      const respuesta = await fetch(`${API_BASE_URL}/habitaciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(habitacion)
      });
      return await respuesta.json();
    }
  
    async eliminarHabitacion(id: number): Promise<void> {
      await fetch(`${API_BASE_URL}/habitaciones/${id}`, {
        method: 'DELETE'
      });
    }
  
}
