import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, Habitacion, Reserva } from '../../../../models';

@Component({
  selector: 'app-lista-reservas',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-reservas.html',
  styleUrl: './lista-reservas.css',
})
export class ListaReservas {
  @Input() reservas: Reserva[] = [];
  @Input() clientes: Cliente[] = [];
  @Input() habitaciones: Habitacion[] = [];
  @Output() reservaEliminar = new EventEmitter<number>();
  @Output() reservaEditarEstado = new EventEmitter<{ estado: string, id: number, reserva: Reserva }>();

  cambiarEstado(reserva: Reserva) {
    reserva.editando = !reserva.editando;
  }

  obtenerNombreCliente(clienteId: number): string {
    const cliente = this.clientes.find(c => c.id === clienteId);
    if (!cliente) {
      return 'cliente no encontrado';
    }
    return cliente.nombre + ' ' + cliente.apellido;
  }

  obtenerTextoHabitacion(habitacionId: number): string {
    const habitacion = this.habitaciones.find(h => h.id === habitacionId);
    if (!habitacion) {
      return 'habitacion no encontrada';
    }
    return habitacion.tipo + ' - S/ ' + habitacion.precio;
  }

  eliminar(id: number) {
    this.reservaEliminar.emit(id);
  }

  editar(estado: string, id: number, reserva: Reserva) {
    this.reservaEditarEstado.emit({ estado, id, reserva });
  }
}
