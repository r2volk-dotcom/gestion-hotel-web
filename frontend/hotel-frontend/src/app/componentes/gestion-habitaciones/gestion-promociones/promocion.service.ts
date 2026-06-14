import { Injectable } from '@angular/core';
import { Promociones } from '../../../models';
import { API_BASE_URL } from '../../../api.config';

@Injectable({
  providedIn: 'root'
})

export class PromocionService {

  async obtenerPromociones(): Promise<Promociones[]> {
    const respuesta = await fetch(`${API_BASE_URL}/promociones`);
    return await respuesta.json();
  }

  async guardarPromocion(nombre: string): Promise<Promociones> {
    const respuesta = await fetch(`${API_BASE_URL}/promociones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, descuento: 0.1, activa: false })
    });
    return await respuesta.json();
  }

  async eliminarPromocion(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/promociones/${id}`, {
      method: 'DELETE'
    });
  }
}