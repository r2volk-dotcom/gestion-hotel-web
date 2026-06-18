import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente, Habitacion, Reserva,Empleado } from '../../models';

// Servicios necesarios
import { ClienteService } from '../clientes/cliente.service';
import { HabitacionService } from '../habitaciones/habitacion.service';
import { ReservaService } from './reserva.service';
import { EmpleadoService } from '../empleados/empleado.service';

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
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef
  ) {}

  // Listas de clientes, habitaciones y reservas
  clientes: Cliente[] = [];
  habitaciones: Habitacion[] = [];
  reservas: Reserva[] = [];
  empleados: Empleado[] = [];
  usuarioActivo: Empleado | null = null;

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarDatos(); // carga inicial de datos
  }

  // Carga los datos necesarios
  async cargarDatos() {
    await this.cargarClientes(); 
    await this.cargarHabitaciones(); 
    await this.cargarReservas();
    await this.cargarEmpleados();

    this.usuarioActivo = this.empleadoService.obtenerUsuarioActual();
  }

  async cargarEmpleados() {
    this.empleados = await this.empleadoService.obtenerEmpleados();
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

  // Edita el estado de una reserva usando el servicio
  async editarEstado(event: { estado: string, id: number, reserva: Reserva }){
    await this.reservaService.actualizarEstado(event.id, event.estado);

    // Desactiva modo edicion y recarga datos
    event.reserva.editando = false;
    await this.cargarDatos();
  }

}
