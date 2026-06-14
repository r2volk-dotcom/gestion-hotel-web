import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../../models';
import { PromocionService } from '../../gestion-habitaciones/gestion-promociones/promocion.service';

@Component({
  selector: 'app-modal-habitacion',
  imports: [CommonModule],
  templateUrl: './modal-habitacion.html',
  styleUrl: './modal-habitacion.css',
})
// Componente de modal para ver detalles de una habitacion
export class ModalHabitacion {
  // Datos de entrada y salida
  @Input() habitacion: Habitacion | null = null;
  @Output() cerrar = new EventEmitter<void>();

  // Inyecta el servicio de promociones como publico
  constructor(public promocionService: PromocionService) {}

  // Cierra el modal de habitacion
  cerrarModal() {
    this.cerrar.emit();
  }
}
