// Importa Component, Input, Output, EventEmitter de Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa FormsModule para enlazar formularios
import { FormsModule } from '@angular/forms';
// Importa las interfaces necesarias
import { Habitacion, Servicios } from '../../../../models';

// Decorador del componente
@Component({
  selector: 'app-formulario-habitacion', // etiqueta HTML
  imports: [CommonModule, FormsModule], // modulos importados
  templateUrl: './registrar-habitacion.html', // plantilla HTML
  styleUrl: './registrar-habitacion.css', // archivo de estilos
})
// Componente de formulario para registrar habitaciones
export class FormularioHabitacion {
  // Datos de entrada
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

  // Eventos de salida para interaccion con el panel padre
  @Output() alSeleccionarImagen = new EventEmitter<any>();
  @Output() toggleServicio = new EventEmitter<number>();
  @Output() guardarHabitacion = new EventEmitter<void>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  // Envia evento de seleccion de archivo de imagen
  onFileSelected(event: any) {
    this.alSeleccionarImagen.emit(event);
  }

  // Envia el ID del servicio marcado o desmarcado
  onToggleServicio(id: number) {
    this.toggleServicio.emit(id);
  }

  // Envia el evento de confirmacion de guardado
  onSubmit() {
    this.guardarHabitacion.emit();
  }

  // Envia el evento de cancelacion de edicion
  onCancel() {
    this.cancelarEdicion.emit();
  }
}
