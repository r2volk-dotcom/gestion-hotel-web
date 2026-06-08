// importa Component, OnInit (ciclo de vida) y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// importa CommonModule para ngClass, ngModel y ngValue
import { CommonModule } from '@angular/common';
// importa las interfaces Cliente, Habitacion y Reserva
import { Cliente, Habitacion, Reserva } from '../../models';
// importa la URL base de la API
import { API_BASE_URL } from '../../api.config';
// importa los nuevos subcomponentes
import { FormularioReserva } from './componentes/formulario-reserva/formulario-reserva';
import { ListaReservas } from './componentes/lista-reservas/lista-reservas';

// decorador que define el componente Reservas
@Component({
  selector: 'app-reservas',          // etiqueta HTML: <app-reservas>
  imports: [CommonModule, FormularioReserva, ListaReservas], // modulos necesarios
  templateUrl: './reservas.html',    // archivo de plantilla HTML
  styleUrl: './reservas.css'         // archivo de estilos CSS
})
// clase del componente Reservas que implementa OnInit
export class Reservas implements OnInit {
  // constructor que inyecta ChangeDetectorRef para deteccion manual de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // array que almacena la lista de clientes (para el select)
  clientes: Cliente[] = [];
  // array que almacena la lista de habitaciones (para el select)
  habitaciones: Habitacion[] = [];
  // array que almacena la lista de reservas cargadas
  reservas: Reserva[] = [];

  // metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarDatos();        // carga todos los datos necesarios
  }

  // metodo que carga clientes, habitaciones y reservas en secuencia
  async cargarDatos() {
    await this.cargarClientes();     // primero carga clientes
    await this.cargarHabitaciones(); // luego carga habitaciones
    await this.cargarReservas();     // finalmente carga reservas
  }

  // metodo async que obtiene clientes del backend
  async cargarClientes() {
    // peticion GET al endpoint de clientes
    const respuesta = await fetch(`${API_BASE_URL}/clientes`);
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de clientes
    this.clientes = datos;
  }

  // metodo async que obtiene habitaciones del backend
  async cargarHabitaciones() {
    // peticion GET al endpoint de habitaciones
    const respuesta = await fetch(`${API_BASE_URL}/habitaciones`);
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de habitaciones
    this.habitaciones = datos;
  }

  // metodo async que obtiene reservas del backend
  async cargarReservas() {
    // peticion GET al endpoint de reservas
    const respuesta = await fetch(`${API_BASE_URL}/reservas`);
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de reservas
    this.reservas = datos;
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }

  // metodo async que guarda una nueva reserva en el backend
  async guardarReserva(nuevaReserva: Reserva) {
    // peticion POST al endpoint de reservas
    const respuesta = await fetch(`${API_BASE_URL}/reservas`, {
      method: 'POST',                // metodo HTTP POST
      headers: {
        'Content-Type': 'application/json' // cabecera JSON
      },
      body: JSON.stringify(nuevaReserva) // cuerpo con datos de la reserva
    });

    // convierte la respuesta a JSON (reserva guardada)
    const reservaGuardada = await respuesta.json();

    // agrega la nueva reserva al array local
    this.reservas.push(reservaGuardada);
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }

  async eliminarReserva(idEliminar:number){
    await fetch(`${API_BASE_URL}/reservas/${idEliminar}`,
    {
      method: 'DELETE'
    });

    this.reservas = this.reservas.filter(
      reserva => reserva.id !== idEliminar
    );

    this.cdr.detectChanges();
  }

  async editarEstado(event: { estado: string, id: number, reserva: Reserva }){
    let endpoint = "";
    if (event.estado === "CheckOut") {
        endpoint = "checkout";
      } else if (event.estado === "CheckIn") {
        endpoint = "checkin";
      } else if (event.estado === "Cancelado"){
        endpoint = "cancelar";
      } else {
        return;
      }
    await fetch(`${API_BASE_URL}/reservas/${event.id}/${endpoint}`,{
        method: 'PUT'
    })

    event.reserva.editando = false;
    this.cargarDatos();
  }
}
