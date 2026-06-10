// Importa Component, Input, Output y EventEmitter de Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa la interfaz Habitacion
import { Habitacion } from '../../../../models';

// Decorador del componente
@Component({
  selector: 'app-tabla-habitaciones', // etiqueta HTML
  imports: [CommonModule], // modulos importados
  templateUrl: './tabla-habitaciones.html', // plantilla HTML
  styleUrl: './tabla-habitaciones.css', // archivo de estilos
})
// Componente de tabla para listar habitaciones
export class TablaHabitaciones {
  // Datos de entrada y eventos de salida
  @Input() habitaciones: Habitacion[] = [];
  @Output() iniciarEdicion = new EventEmitter<Habitacion>();
  @Output() eliminarHabitacion = new EventEmitter<number>();

  // Envia la habitacion a editar al componente padre
  onEdit(habitacion: Habitacion) {
    this.iniciarEdicion.emit(habitacion);
  }

  // Envia el ID de la habitacion a eliminar al padre
  onDelete(id: number) {
    this.eliminarHabitacion.emit(id);
  }
}
