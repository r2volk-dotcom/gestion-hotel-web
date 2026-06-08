import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, Habitacion, Reserva } from '../../../../models';

@Component({
  selector: 'app-formulario-reserva',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-reserva.html',
  styleUrl: './formulario-reserva.css',
})
export class FormularioReserva {
  @Input() clientes: Cliente[] = [];
  @Input() habitaciones: Habitacion[] = [];
  @Output() reservaGuardar = new EventEmitter<Reserva>();

  nuevaReserva: Reserva = {
    clienteId: 0,
    habitacionId: 0,
    fechaEntrada: '',
    fechaSalida: '',
    estado: 'RESERVADO'
  };

  guardar() {
    if (this.nuevaReserva.clienteId === 0 || this.nuevaReserva.habitacionId === 0) {
      alert('selecciona cliente y habitacion');
      return;
    }
    this.reservaGuardar.emit(this.nuevaReserva);
    this.nuevaReserva = {
      clienteId: 0,
      habitacionId: 0,
      fechaEntrada: '',
      fechaSalida: '',
      estado: 'RESERVADO'
    };
  }
}
