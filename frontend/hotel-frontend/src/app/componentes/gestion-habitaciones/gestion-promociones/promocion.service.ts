import { Injectable } from '@angular/core';
import { Promociones } from '../../../models';
import { API_BASE_URL } from '../../../api.config';

@Injectable({
  providedIn: 'root'
})

export class PromocionService {

  // Guarda la promocion activa en memoria
  promocionActiva: Promociones | null = null;

  // Carga la promocion activa desde el servidor
  async cargarPromocionActiva(): Promise<Promociones | null> {
    const promos = await this.obtenerPromociones();
    this.promocionActiva = promos.find(p => p.activa) || null;
    return this.promocionActiva;
  }

  // Calcula el precio final aplicando el descuento
  calcularPrecioFinal(precio: number | null): number {
    const basePrecio = precio !== null ? precio : 0;
    if (this.promocionActiva) {
      return basePrecio * (1 - this.promocionActiva.descuento);
    }
    return basePrecio;
  }

  async obtenerPromociones(): Promise<Promociones[]> {
    const respuesta = await fetch(`${API_BASE_URL}/promociones`);
    return await respuesta.json();
  }

  async guardarPromocion(nombre: string, descuento: number): Promise<Promociones> {
    const respuesta = await fetch(`${API_BASE_URL}/promociones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, descuento , activa: false })
    });
    return await respuesta.json();
  }

  async eliminarPromocion(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/promociones/${id}`, {
      method: 'DELETE'
    });
  }

  // Activa una promocion y desactiva las demas
  async activarPromocion(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/promociones/activar/${id}`, {
      method: 'PUT'
    });
    await this.cargarPromocionActiva();
  }

  // Desactiva todas las promociones
  async desactivarTodas(): Promise<void> {
    await fetch(`${API_BASE_URL}/promociones/desactivar-todas`, {
      method: 'PUT'
    });
    this.promocionActiva = null;
  }
}