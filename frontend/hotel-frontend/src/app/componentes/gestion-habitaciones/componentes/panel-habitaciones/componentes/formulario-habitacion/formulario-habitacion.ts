import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion, Servicios } from '../../../../../../models';

@Component({
  selector: 'app-formulario-habitacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-habitacion.html',
  styleUrl: './formulario-habitacion.css',
})
export class FormularioHabitacion {
  @Input() serviciosDisponibles: Servicios[] = [];
  @Input() serviciosSeleccionados: number[] = [];
  @Input() nombreImagen: string = '';
  @Input() nuevaHabitacion: Habitacion = {
    tipo: '',
    precio: 0,
    disponible: true,
    imagen: '',
    servicios: []
  };
  @Input() idHabitacionEdicion: number | null = null;

  @Output() alSeleccionarImagen = new EventEmitter<any>();
  @Output() toggleServicio = new EventEmitter<number>();
  @Output() guardarHabitacion = new EventEmitter<void>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  onFileSelected(event: any) {
    this.alSeleccionarImagen.emit(event);
  }

  onToggleServicio(id: number) {
    this.toggleServicio.emit(id);
  }

  onSubmit() {
    this.guardarHabitacion.emit();
  }

  onCancel() {
    this.cancelarEdicion.emit();
  }
}
