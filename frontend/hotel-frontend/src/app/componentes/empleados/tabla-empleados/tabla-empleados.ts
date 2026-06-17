import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../../models';

@Component({
  selector: 'app-tabla-empleados',
  imports: [CommonModule],
  templateUrl: './tabla-empleados.html',
  styleUrl: './tabla-empleados.css',
})
// Componente para listar empleados en una tabla
export class TablaEmpleados {
  // Lista de empleados recibida del componente padre
  @Input() empleados: Empleado[] = [];

  // Eventos emitidos al padre para editar y eliminar
  @Output() empleadoEditar = new EventEmitter<Empleado>();
  @Output() empleadoEliminar = new EventEmitter<number>();

  // Envia el empleado seleccionado para iniciar edicion
  editar(empleado: Empleado) {
    this.empleadoEditar.emit(empleado);
  }

  // Envia el ID del empleado que se desea eliminar
  eliminar(id: number) {
    this.empleadoEliminar.emit(id);
  }
}
