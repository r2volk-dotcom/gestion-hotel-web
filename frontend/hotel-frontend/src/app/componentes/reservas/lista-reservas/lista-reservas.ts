// Importa Component, Input, Output y EventEmitter de Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa FormsModule para formularios
import { FormsModule } from '@angular/forms';
// Importa las interfaces necesarias
import { Cliente, Habitacion, Reserva } from '../../../models';

// Decorador del componente
@Component({
  selector: 'app-lista-reservas', // etiqueta HTML
  imports: [CommonModule, FormsModule], // modulos importados
  templateUrl: './lista-reservas.html', // plantilla HTML
  styleUrl: './lista-reservas.css', // archivo de estilos
})
// Componente para mostrar el listado de reservas
export class ListaReservas {
  // Datos de entrada y eventos de salida
  @Input() reservas: Reserva[] = [];
  @Input() clientes: Cliente[] = [];
  @Input() habitaciones: Habitacion[] = [];
  @Output() reservaEliminar = new EventEmitter<number>();
  @Output() reservaEditarEstado = new EventEmitter<{ estado: string, id: number, reserva: Reserva }>();

  // Activa o desactiva el modo de edicion en la interfaz
  cambiarEstado(reserva: Reserva) {
    reserva.editando = !reserva.editando;
  }

  // Busca y retorna el nombre completo del cliente
  obtenerNombreCliente(clienteId: number): string {
    const cliente = this.clientes.find(c => c.id === clienteId);
    if (!cliente) {
      return 'cliente no encontrado';
    }
    return cliente.nombre + ' ' + cliente.apellido;
  }

  // Busca la habitacion y retorna su tipo y precio de reserva
  obtenerTextoHabitacion(reserva: Reserva): string {
    const habitacion = this.habitaciones.find(h => h.id === reserva.habitacionId);
    if (!habitacion) {
      return 'habitacion no encontrada';
    }
    // Muestra el precio por noche inmutable o el actual de la habitacion
    return habitacion.tipo + ' / S/ ' + (reserva.precioPorNoche ?? habitacion.precio);
  }

  // Envia el ID de la reserva a eliminar al padre
  eliminar(id: number) {
    this.reservaEliminar.emit(id);
  }

  // Envia los datos de edicion de estado al padre
  editar(estado: string, id: number, reserva: Reserva) {
    this.reservaEditarEstado.emit({ estado, id, reserva });
  }
}
