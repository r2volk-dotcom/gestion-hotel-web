// Importa Component, Input, Output y EventEmitter de Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa FormsModule para enlazar formularios
import { FormsModule } from '@angular/forms';
// Importa las interfaces necesarias
import { Cliente, Habitacion, Reserva } from '../../../models';

// Decorador del componente
@Component({
  selector: 'app-formulario-reserva', // etiqueta HTML
  imports: [CommonModule, FormsModule], // modulos importados
  templateUrl: './formulario-reserva.html', // plantilla HTML
  styleUrl: './formulario-reserva.css', // archivo de estilos
})
// Componente de formulario para registrar reservas
export class FormularioReserva {
  // Datos de entrada y eventos de salida
  @Input() clientes: Cliente[] = [];
  @Input() habitaciones: Habitacion[] = [];
  @Output() reservaGuardar = new EventEmitter<Reserva>();

  // Modelo temporal para nueva reserva
  nuevaReserva: Reserva = {
    clienteId: 0,
    habitacionId: 0,
    fechaEntrada: '',
    fechaSalida: '',
    estado: 'RESERVADO'
  };

  // Valida y envia la reserva al componente padre
  guardar() {
    if (this.nuevaReserva.clienteId === 0 || this.nuevaReserva.habitacionId === 0) {
      alert('selecciona cliente y habitacion');
      return;
    }
    this.reservaGuardar.emit(this.nuevaReserva);
    // Reinicia el formulario
    this.nuevaReserva = {
      clienteId: 0,
      habitacionId: 0,
      fechaEntrada: '',
      fechaSalida: '',
      estado: 'RESERVADO'
    };
  }
}
