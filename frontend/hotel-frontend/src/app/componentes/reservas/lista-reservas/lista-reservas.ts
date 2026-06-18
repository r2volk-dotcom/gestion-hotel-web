import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, Habitacion, Reserva, Empleado } from '../../../models';


@Component({
  selector: 'app-lista-reservas', 
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-reservas.html',
  styleUrl: './lista-reservas.css',
})


export class ListaReservas {
  // Datos de entrada y eventos de salida
  @Input() reservas: Reserva[] = [];
  @Input() clientes: Cliente[] = [];
  @Input() habitaciones: Habitacion[] = [];
  @Input() empleados: Empleado[] = [];
  @Input() usuarioActivo: Empleado | null = null;
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

    // Busca y retorna el nombre completo del empleado
  obtenerNombreEmpleado(empleadoId?: number): string {
    if (!empleadoId) {
      return 'Sistema'; // Si la reserva no tiene empleado registrado
    }
    const emp = this.empleados.find(e => e.id === empleadoId);
    if (!emp) {
      return 'Empleado no encontrado';
    }
    return emp.nombre + ' ' + emp.apellido;
  }
  
  // Retorna true si el usuario activo tiene permiso para editar/eliminar esta reserva
  puedeEditarOBorrar(reserva: Reserva): boolean {
    if (!this.usuarioActivo) {
      return false;
    }
    // Si es administrador, tiene permiso total
    if (this.usuarioActivo.rol === 'Administrador') {
      return true;
    }
    // Si es recepcionista, solo puede editar sus propias reservas
    return reserva.empleadoId === this.usuarioActivo.id;
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
