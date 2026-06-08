import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../../../../../models';

@Component({
  selector: 'app-tabla-habitaciones',
  imports: [CommonModule],
  templateUrl: './tabla-habitaciones.html',
  styleUrl: './tabla-habitaciones.css',
})
export class TablaHabitaciones {
  @Input() habitaciones: Habitacion[] = [];
  @Output() iniciarEdicion = new EventEmitter<Habitacion>();
  @Output() eliminarHabitacion = new EventEmitter<number>();

  onEdit(habitacion: Habitacion) {
    this.iniciarEdicion.emit(habitacion);
  }

  onDelete(id: number) {
    this.eliminarHabitacion.emit(id);
  }
}
