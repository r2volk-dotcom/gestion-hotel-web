import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../../models';

@Component({
  selector: 'app-tabla-clientes',
  imports: [CommonModule],
  templateUrl: './tabla-clientes.html',
  styleUrl: './tabla-clientes.css',
})
export class TablaClientes {
  @Input() clientes: Cliente[] = [];
  @Input() clientesBuscados: Cliente[] = [];
  @Output() clienteEliminar = new EventEmitter<number>();

  eliminar(id: number) {
    this.clienteEliminar.emit(id);
  }
}
