import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pago } from '../../../models';

@Component({
  selector: 'app-registro-pagos-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-pagos-modal.html',
  styleUrl: './registro-pagos-modal.css',
})
export class RegistroPagosModal {

  @Input() pago: Pago | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<string>();

  metodoSeleccionado: string = `Efectivo`;

  metodosPago: String[] = [
    'Efectivo',
    'Tarjeta de Crédito',
    'Tarjeta de Débito',
    'Transferencia Bancaria',
    'Plin / Yape'
  ];

  cerrarModal(){
    this.cerrar.emit();
  }
  
  confirmarPago(){
    this.confirmar.emit(this.metodoSeleccionado);
  }
}