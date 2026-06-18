import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, Habitacion, Reserva, Empleado } from '../../../models';

@Component({
  selector: 'app-formulario-reserva',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-reserva.html', 
  styleUrl: './formulario-reserva.css',
})


export class FormularioReserva {
  // Datos de entrada y eventos de salida
  @Input() clientes: Cliente[] = [];
  @Input() habitaciones: Habitacion[] = [];
  @Input() empleados: Empleado[] = [];
  @Input() usuarioActivo: Empleado | null = null;
  @Output() reservaGuardar = new EventEmitter<Reserva>();

  // Modelo temporal para nueva reserva
  nuevaReserva: Reserva = {
    clienteId: 0,
    habitacionId: 0,
    empleadoId: 0,
    fechaEntrada: '',
    fechaSalida: '',
    estado: 'RESERVADO'
  };

  ngOnInit() {
    if (this.usuarioActivo) {
      this.nuevaReserva.empleadoId = this.usuarioActivo.id || 0;
    }
  }

  // Valida y envia la reserva al componente padre
  guardar() {
    // Validamos que se haya seleccionado cliente, habitacion y un empleado
    if (this.nuevaReserva.clienteId === 0 || this.nuevaReserva.habitacionId === 0 || this.nuevaReserva.empleadoId === 0) {
      alert('Por favor selecciona cliente, habitacion y empleado.');
      return;
    }
    this.reservaGuardar.emit(this.nuevaReserva);
    
    // Reiniciamos el formulario limpiando cliente y habitacion, pero manteniendo el ID del empleado logueado
    this.nuevaReserva = {
      clienteId: 0,
      habitacionId: 0,
      empleadoId: this.usuarioActivo?.id || 0,
      fechaEntrada: '',
      fechaSalida: '',
      estado: 'RESERVADO'
    };
  }
}
