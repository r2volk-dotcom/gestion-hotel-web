import { Injectable } from '@angular/core';
import { Reserva } from '../../models';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  async obtenerReservas(): Promise<Reserva[]>{
    const respuesta = await fetch(`${API_BASE_URL}/reservas`);
    return await respuesta.json();
  }

  async guardarReserva(nuevaReserva: Reserva): Promise<Reserva> {
    const respuesta = await fetch(`${API_BASE_URL}/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaReserva)
    });
    return await respuesta.json();
  }

  async eliminarReserva(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/reservas/${id}`, {
      method: 'DELETE'
    });
  }
  
  // Actualiza el estado de la reserva mapeandolo al endpoint correcto
  async actualizarEstado(id: number, estado: string): Promise<void> {
    let endpoint = "";
    if (estado === "CheckOut") {
      endpoint = "checkout";
    } else if (estado === "CheckIn") {
      endpoint = "checkin";
    } else if (estado === "Cancelado") {
      endpoint = "cancelar";
    } else {
      return;
    }

    await fetch(`${API_BASE_URL}/reservas/${id}/${endpoint}`, {
      method: 'PUT'
    });
  }

}
