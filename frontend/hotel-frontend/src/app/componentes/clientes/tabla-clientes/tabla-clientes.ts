// Importa Component, Input, Output y EventEmitter de Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa la interfaz Cliente
import { Cliente } from '../../../models';

// Decorador del componente
@Component({
  selector: 'app-tabla-clientes', // etiqueta HTML
  imports: [CommonModule], // modulos importados
  templateUrl: './tabla-clientes.html', // plantilla HTML
  styleUrl: './tabla-clientes.css', // archivo de estilos
})
// Componente de tabla para listar clientes
export class TablaClientes {
  // Datos de entrada y eventos de salida
  @Input() clientes: Cliente[] = [];
  @Input() clientesBuscados: Cliente[] = [];
  @Output() clienteEliminar = new EventEmitter<number>();

  // Envia el ID del cliente a eliminar al componente padre
  eliminar(id: number) {
    this.clienteEliminar.emit(id);
  }
}
