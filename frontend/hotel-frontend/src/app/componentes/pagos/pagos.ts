import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pago } from '../../models';
import { PagoService } from './pago.service';
import { TablaPagos } from './tabla-pagos/tabla-pagos';
import { RegistroPagosModal } from './registro-pagos-modal/registro-pagos-modal';

@Component({
  selector: 'app-pagos',
  imports: [CommonModule,TablaPagos, RegistroPagosModal],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css',
})
export class Pagos implements OnInit{

  constructor(
    private pagoService: PagoService,
    private cdr: ChangeDetectorRef
  ) {}

  pagos: Pago[] = [];
  pagoSeleccionado: Pago | null = null;
  mostrarModal = false;

  async ngOnInit() {
    await this.cargarPagos();
  }

  async cargarPagos() {
    this.pagos = await this.pagoService.obtenerPagos();
    this.cdr.detectChanges();
  }

  abrirModal(pago: Pago) {
    this.pagoSeleccionado = pago;
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.pagoSeleccionado = null;
    this.cdr.detectChanges();
  }

  async confirmarPago(metodoPago: string) {
    if (!this.pagoSeleccionado?.id) {
      return;
    }
    await this.pagoService.confirmarPago(this.pagoSeleccionado.id, metodoPago);
    await this.cargarPagos();
    this.cerrarModal();
  }

  imprimirBoleta(pago: Pago) { /* aquí va la lógica de impresión */ }

}
