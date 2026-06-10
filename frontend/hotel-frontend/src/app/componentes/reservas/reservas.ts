// Importa Component, OnInit y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa las interfaces necesarias
import { Cliente, Habitacion, Reserva } from '../../models';
// Importa la URL base del backend
import { API_BASE_URL } from '../../api.config';
// Importa los subcomponentes del modulo
import { FormularioReserva } from './formulario-reserva/formulario-reserva';
import { ListaReservas } from './lista-reservas/lista-reservas';

// Decorador del componente
@Component({
  selector: 'app-reservas', // etiqueta HTML
  imports: [CommonModule, FormularioReserva, ListaReservas], // componentes importados
  templateUrl: './reservas.html', // plantilla HTML
  styleUrl: './reservas.css' // archivo de estilos
})
// Componente principal para la gestion de reservas
export class Reservas implements OnInit {
  // Inyecta detector de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // Listas de clientes, habitaciones y reservas
  clientes: Cliente[] = [];
  habitaciones: Habitacion[] = [];
  reservas: Reserva[] = [];

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarDatos(); // carga inicial de datos
  }

  // Carga todos los datos necesarios
  async cargarDatos() {
    await this.cargarClientes(); // carga clientes
    await this.cargarHabitaciones(); // carga habitaciones
    await this.cargarReservas(); // carga reservas
  }

  // Obtiene los clientes desde el servidor
  async cargarClientes() {
    // Peticion HTTP GET
    const respuesta = await fetch(`${API_BASE_URL}/clientes`);
    // Convierte respuesta a JSON
    const datos = await respuesta.json();
    // Asigna clientes a la lista
    this.clientes = datos;
  }

  // Obtiene las habitaciones desde el servidor
  async cargarHabitaciones() {
    // Peticion HTTP GET
    const respuesta = await fetch(`${API_BASE_URL}/habitaciones`);
    // Convierte respuesta a JSON
    const datos = await respuesta.json();
    // Asigna habitaciones a la lista
    this.habitaciones = datos;
  }

  // Obtiene las reservas desde el servidor
  async cargarReservas() {
    // Peticion HTTP GET
    const respuesta = await fetch(`${API_BASE_URL}/reservas`);
    // Convierte respuesta a JSON
    const datos = await respuesta.json();
    // Asigna reservas a la lista
    this.reservas = datos;
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

  // Guarda una nueva reserva
  async guardarReserva(nuevaReserva: Reserva) {
    // Peticion HTTP POST
    const respuesta = await fetch(`${API_BASE_URL}/reservas`, {
      method: 'POST', // metodo HTTP
      headers: {
        'Content-Type': 'application/json' // cabecera JSON
      },
      body: JSON.stringify(nuevaReserva) // datos de la reserva
    });

    // Convierte la respuesta a JSON
    const reservaGuardada = await respuesta.json();

    // Agrega la reserva a la lista local
    this.reservas.push(reservaGuardada);
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

  // Elimina una reserva por su ID
  async eliminarReserva(idEliminar:number){
    // Peticion HTTP DELETE
    await fetch(`${API_BASE_URL}/reservas/${idEliminar}`,
    {
      method: 'DELETE'
    });

    // Filtra y remueve la reserva de la lista
    this.reservas = this.reservas.filter(
      reserva => reserva.id !== idEliminar
    );

    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

  // Edita el estado de una reserva
  async editarEstado(event: { estado: string, id: number, reserva: Reserva }){
    let endpoint = ""; // variable para el endpoint especifico
    // Selecciona el endpoint segun el estado
    if (event.estado === "CheckOut") {
        endpoint = "checkout";
      } else if (event.estado === "CheckIn") {
        endpoint = "checkin";
      } else if (event.estado === "Cancelado"){
        endpoint = "cancelar";
      } else {
        return;
      }
    
    // Peticion HTTP PUT para actualizar el estado
    await fetch(`${API_BASE_URL}/reservas/${event.id}/${endpoint}`,{
        method: 'PUT'
    })

    // Desactiva modo edicion y recarga datos
    event.reserva.editando = false;
    this.cargarDatos();
  }
}
