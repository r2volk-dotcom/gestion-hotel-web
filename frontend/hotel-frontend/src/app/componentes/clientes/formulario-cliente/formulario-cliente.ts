// Importa Component, Output y EventEmitter de Angular
import { Component, Output, EventEmitter } from '@angular/core';
// Importa CommonModule para directivas
import { CommonModule } from '@angular/common';
// Importa FormsModule para enlazar formularios
import { FormsModule } from '@angular/forms';
// Importa la interfaz Cliente
import { Cliente } from '../../../models';

// Decorador del componente
@Component({
  selector: 'app-formulario-cliente', // etiqueta HTML
  imports: [CommonModule, FormsModule], // modulos importados
  templateUrl: './formulario-cliente.html', // plantilla HTML
  styleUrl: './formulario-cliente.css', // archivo de estilos
})
// Componente de formulario de registro de cliente
export class FormularioCliente {
  // Eventos de salida
  @Output() clienteGuardar = new EventEmitter<Cliente>();
  @Output() clienteBuscar = new EventEmitter<string>();

  // Filtro de busqueda por nombre
  nombreBuscar: string = '';

  // Modelo temporal para nuevo cliente
  nuevoCliente: Cliente = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    correo: ''
  };

  // Envia el cliente al componente padre
  guardar() {
    this.clienteGuardar.emit(this.nuevoCliente);
    // Reinicia el formulario
    this.nuevoCliente = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      correo: ''
    };
  }

  // Envia el termino de busqueda al padre
  buscar() {
    this.clienteBuscar.emit(this.nombreBuscar);
  }
}
