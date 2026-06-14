import { Injectable } from '@angular/core';
import { Cliente } from '../../models'; //importamos el modeo
import { API_BASE_URL } from '../../api.config'; //importamos la URL del backend

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  async obtenerClientes(): Promise<Cliente[]> {
    const respuesta = await fetch(`${API_BASE_URL}/clientes`);
    return await respuesta.json();
  }

  async buscarClientes(nombre: string): Promise<Cliente[]> {
    const respuesta = await fetch(`${API_BASE_URL}/clientes/nombre/${nombre}`);
    return await respuesta.json();
  }

  async guardarCliente(nuevoCliente: Cliente): Promise<Cliente> {
    const respuesta = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoCliente)
    });
    return await respuesta.json();
  }

  async eliminarCliente(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'DELETE'
    });
  }
  
}
