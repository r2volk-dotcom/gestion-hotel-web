import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pago } from '../../../models';

@Component({
  selector: 'app-tabla-pagos',
  imports: [CommonModule],
  templateUrl: './tabla-pagos.html',
  styleUrl: './tabla-pagos.css',
})
export class TablaPagos {

  @Input() pagos: Pago[] = [];
  @Output() pagar = new EventEmitter<Pago>();
  @Output() imprimir = new EventEmitter<Pago>();

}
