import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // angular
import { CommonModule } from '@angular/common'; // ngFor, ngIf, ngClass
import { FormsModule } from '@angular/forms'; // ngModel
import { Cliente, Habitacion, Reserva } from '../../models'; // interfaces

@Component({
  selector: 'app-reservas',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css'
})

export class Reservas implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  // listas que se usan en reservas
  clientes: Cliente[] = [];
  habitaciones: Habitacion[] = [];
  reservas: Reserva[] = [];

  // objeto del formulario
  nuevaReserva: Reserva = {
    clienteId: 0,
    habitacionId: 0,
    fechaEntrada: '',
    fechaSalida: '',
    estado: 'RESERVADO'
  };

  // se ejecuta al cargar el componente
  async ngOnInit() {
    await this.cargarDatos();
  }

  // carga clientes, habitaciones y reservas
  async cargarDatos() {
    await this.cargarClientes();
    await this.cargarHabitaciones();
    await this.cargarReservas();
  }

  // pide clientes al backend
  async cargarClientes() {
    const respuesta = await fetch('http://localhost:8080/clientes');
    const datos = await respuesta.json();
    this.clientes = datos;
  }

  // pide habitaciones al backend
  async cargarHabitaciones() {
    const respuesta = await fetch('http://localhost:8080/habitaciones');
    const datos = await respuesta.json();
    this.habitaciones = datos;
  }

  // pide reservas al backend
  async cargarReservas() {
    const respuesta = await fetch('http://localhost:8080/reservas');
    const datos = await respuesta.json();
    this.reservas = datos;
    this.cdr.detectChanges();
  }

  // busca nombre de cliente por id
  obtenerNombreCliente(clienteId: number): string {
    const cliente = this.clientes.find(c => c.id === clienteId);

    if (!cliente) {
      return 'cliente no encontrado';
    }

    return cliente.nombre + ' ' + cliente.apellido;
  }

  // busca texto de habitacion por id
  obtenerTextoHabitacion(habitacionId: number): string {
    const habitacion = this.habitaciones.find(h => h.id === habitacionId);

    if (!habitacion) {
      return 'habitacion no encontrada';
    }

    return habitacion.tipo + ' - S/ ' + habitacion.precio;
  }

  // guarda una reserva en backend
  async guardarReserva() {
    if (this.nuevaReserva.clienteId === 0 || this.nuevaReserva.habitacionId === 0) {
      alert('selecciona cliente y habitacion');
      return;
    }

    const respuesta = await fetch('http://localhost:8080/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.nuevaReserva)
    });

    await respuesta.json();

    await this.cargarReservas();

    // limpia formulario
    this.nuevaReserva = {
      clienteId: 0,
      habitacionId: 0,
      fechaEntrada: '',
      fechaSalida: '',
      estado: 'RESERVADO'
    };
    this.cdr.detectChanges();
  }
}
