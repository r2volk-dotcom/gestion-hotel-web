// Importa Component, OnInit y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa la interfaz Cliente
import { Cliente } from '../../models';
// Importa la URL base del backend
import { API_BASE_URL } from '../../api.config';
// Importa los subcomponentes del modulo
import { FormularioCliente } from './formulario-cliente/formulario-cliente';
import { TablaClientes } from './tabla-clientes/tabla-clientes';

// Decorador del componente
@Component({
  selector: 'app-clientes', // etiqueta HTML
  imports: [CommonModule, FormularioCliente, TablaClientes], // modulos importados
  templateUrl: './clientes.html', // plantilla HTML
  styleUrl: './clientes.css' // archivo de estilos
})
// Componente principal para gestionar clientes
export class Clientes implements OnInit {
  // Inyecta detector de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // Listas de clientes cargados y buscados
  clientes: Cliente[] = [];
  clientesBuscados: Cliente[] = [];

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarClientes(); // carga inicial de clientes
  }

  // Carga todos los clientes desde el servidor
  async cargarClientes() {
    // Peticion HTTP GET
    const respuesta = await fetch(`${API_BASE_URL}/clientes`);
    // Convierte respuesta a JSON
    const datos = await respuesta.json();
    // Guarda clientes en la lista
    this.clientes = datos;
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

  // Busca clientes por nombre
  async buscarClientes(name:string){
    // Peticion de busqueda
    const respuesta = await fetch(`${API_BASE_URL}/clientes/nombre/${name}`);
    // Convierte resultados a JSON
    this.clientesBuscados = await respuesta.json();
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

  // Elimina un cliente por su ID
  async eliminarCliente(idEliminar:number){
    // Peticion HTTP DELETE
    await fetch(`${API_BASE_URL}/clientes/${idEliminar}`,
    {
      method: 'DELETE'
    });

    // Remueve el cliente de la lista local
    this.clientes = this.clientes.filter(
      cliente => cliente.id !== idEliminar
    );
    // Remueve el cliente de la lista de busqueda
    this.clientesBuscados = this.clientesBuscados.filter(
      clientesBuscado => clientesBuscado.id !== idEliminar
    )
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

  // Guarda un nuevo cliente
  async guardarCliente(nuevoCliente: Cliente) {
    // Peticion HTTP POST
    const respuesta = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST', // metodo HTTP
      headers: {
        'Content-Type': 'application/json' // cabecera JSON
      },
      body: JSON.stringify(nuevoCliente) // datos del cliente
    });

    // Convierte el cliente guardado a JSON
    const clienteGuardado = await respuesta.json();

    // Agrega el cliente a la lista local
    this.clientes.push(clienteGuardado);
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }
}
