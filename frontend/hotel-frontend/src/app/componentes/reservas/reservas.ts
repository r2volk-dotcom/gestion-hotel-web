import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente, Habitacion, Reserva } from '../../models';

// Servicios necesarios
import { ClienteService } from '../clientes/cliente.service';
import { HabitacionService } from '../habitaciones/habitacion.service';
import { ReservaService } from './reserva.service';

// Subcomponentes del modulo
import { FormularioReserva } from './formulario-reserva/formulario-reserva';
import { ListaReservas } from './lista-reservas/lista-reservas';


@Component({
  selector: 'app-reservas',
  imports: [CommonModule, FormularioReserva, ListaReservas],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css'
})

export class Reservas implements OnInit {
  // Inyecta detector de cambios
  constructor(
    private clienteService: ClienteService,
    private habitacionService: HabitacionService,
    private reservaService: ReservaService,
    private cdr: ChangeDetectorRef
  ) {}

  // Listas de clientes, habitaciones y reservas
  clientes: Cliente[] = [];
  habitaciones: Habitacion[] = [];
  reservas: Reserva[] = [];

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarDatos(); // carga inicial de datos
  }

  // Carga los datos necesarios
  async cargarDatos() {
    await this.cargarClientes(); 
    await this.cargarHabitaciones(); 
    await this.cargarReservas();
  }


  async cargarClientes() {
    this.clientes = await this.clienteService.obtenerClientes();
  }


  async cargarHabitaciones() {
    this.habitaciones = await this.habitacionService.obtenerHabitaciones();
  }


  async cargarReservas(){
    this.reservas = await this.reservaService.obtenerReservas();
    this.cdr.detectChanges();
  }

  // Guarda una nueva reserva
  async guardarReserva(nuevaReserva: Reserva) {
    // Peticion HTTP POST
    const reservaGuardada = await this.reservaService.guardarReserva(nuevaReserva);

    this.reservas.push(reservaGuardada); // Agrega la reserva a la lista local
    this.cdr.detectChanges(); // Notifica cambios a Angular
  }


  async eliminarReserva(idEliminar:number){
    // Peticion HTTP DELETE
    await this.reservaService.eliminarReserva(idEliminar);

    // Filtra y remueve la reserva de la lista local
    this.reservas = this.reservas.filter(
      reserva => reserva.id !== idEliminar
    );

    this.cdr.detectChanges(); // Notifica cambios a Angular
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
     await this.reservaService.actualizarEstado(event.id, endpoint);

    // Desactiva modo edicion y recarga datos
    event.reserva.editando = false;
    this.cargarDatos();
  }

}
