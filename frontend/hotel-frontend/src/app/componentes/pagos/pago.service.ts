import { Injectable } from '@angular/core';
import { Pago } from '../../models';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root',
})
export class PagoService {

  async obtenerPagos(): Promise<Pago[]>{
    const respuesta = await fetch(`${API_BASE_URL}/pagos`);
    return await respuesta.json();
  }

  async guardarPago(nuevoPago: Pago): Promise<Pago>{
    const respuesta = await fetch(`${API_BASE_URL}/pagos`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(nuevoPago)
    });
    return await respuesta.json()
  }

  async confirmarPago(id: number, metodoPago: string): Promise<Pago>{
    const pagoActual = await fetch(`${API_BASE_URL}/pagos/${id}`);
    const pago = await pagoActual.json();

    pago.estado = 'Pagado';
    pago.metodoPago = metodoPago
    pago.fechaPago = new Date().toISOString().split('T')[0];

    const respuesta = await fetch(`${API_BASE_URL}/pagos/${id}`,{
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(pago)
    });
    return await respuesta.json();
  }

  async eliminarPago(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/pagos/${id}`, {
      method: 'DELETE'
    });
  }
}
