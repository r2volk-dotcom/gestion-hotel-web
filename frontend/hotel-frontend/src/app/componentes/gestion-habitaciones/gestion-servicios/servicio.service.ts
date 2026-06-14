import { Injectable } from '@angular/core';
import { Servicios } from '../../../models';
import { API_BASE_URL } from '../../../api.config';


@Injectable({
  providedIn: 'root',
})
export class ServicioService {

  // Obtiene todos los servicios
  async obtenerServicios(): Promise<Servicios[]> {
    const respuesta = await fetch(`${API_BASE_URL}/servicios`);
    return await respuesta.json();
  }

  // Guarda un nuevo servicio
  async guardarServicio(nombre: string): Promise<Servicios> {
    const respuesta = await fetch(`${API_BASE_URL}/servicios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre })
    });
    return await respuesta.json();
  }
  
  // Elimina un servicio por su ID
  async eliminarServicio(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/servicios/${id}`, {
      method: 'DELETE'
    });
  }

}
