import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../../models';

@Component({
  selector: 'app-formulario-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-cliente.html',
  styleUrl: './formulario-cliente.css',
})
export class FormularioCliente {
  @Output() clienteGuardar = new EventEmitter<Cliente>();
  @Output() clienteBuscar = new EventEmitter<string>();

  nombreBuscar: string = '';

  nuevoCliente: Cliente = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    correo: ''
  };

  guardar() {
    this.clienteGuardar.emit(this.nuevoCliente);
    this.nuevoCliente = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      correo: ''
    };
  }

  buscar() {
    this.clienteBuscar.emit(this.nombreBuscar);
  }
}
