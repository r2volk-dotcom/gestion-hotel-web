import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empleado } from '../../../models';

@Component({
  selector: 'app-registro-empleado',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-empleado.html',
  styleUrl: './registro-empleado.css',
})
// Componente de formulario para registrar y editar empleados
export class RegistroEmpleado {
  // Datos del empleado y estado de edicion recibidos del padre
  @Input() empleado: Empleado = {
    nombre: '',
    apellido: '',
    usuario: '',
    contrasena: '',
    rol: '',
    imagen: ''
  };
  @Input() editando: boolean = false;
  @Input() nombreImagen: string = '';

  // Eventos emitidos al padre
  @Output() empleadoGuardar = new EventEmitter<Empleado>();
  @Output() empleadoCancelar = new EventEmitter<void>();
  @Output() alSeleccionarImagen = new EventEmitter<any>();

  // Envia evento de seleccion de archivo de imagen
  onFileSelected(event: any) {
    this.alSeleccionarImagen.emit(event);
  }
  
  // Guarda los datos del formulario emitiendo el evento
  guardar() {
    this.empleadoGuardar.emit(this.empleado);
  }

  // Cancela la operacion actual y limpia el formulario
  cancelar() {
    this.empleadoCancelar.emit();
  }
}
