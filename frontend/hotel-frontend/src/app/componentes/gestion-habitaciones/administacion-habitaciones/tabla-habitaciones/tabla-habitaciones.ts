// Importa Component, Input, Output, EventEmitter, OnInit y ChangeDetectorRef de Angular
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa la interfaz Habitacion y Promociones
import { Habitacion, Promociones } from '../../../../models';
// Importa el servicio de promociones
import { PromocionService } from '../../../gestion-habitaciones/gestion-promociones/promocion.service';

// Decorador del componente
@Component({
  selector: 'app-tabla-habitaciones', // etiqueta HTML
  imports: [CommonModule], // modulos importados
  templateUrl: './tabla-habitaciones.html', // plantilla HTML
  styleUrl: './tabla-habitaciones.css', // archivo de estilos
})
// Componente de tabla para listar habitaciones
export class TablaHabitaciones implements OnInit {
  // Datos de entrada y eventos de salida
  @Input() habitaciones: Habitacion[] = [];
  @Output() iniciarEdicion = new EventEmitter<Habitacion>();
  @Output() eliminarHabitacion = new EventEmitter<number>();

  // Inyecta el servicio de promociones como publico y detector de cambios
  constructor(
    public promocionService: PromocionService,
    private cdr: ChangeDetectorRef
  ) {}

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    // Carga la promocion activa usando el servicio
    await this.promocionService.cargarPromocionActiva();
    this.cdr.detectChanges();
  }

  // Envia la habitacion a editar al componente padre
  onEdit(habitacion: Habitacion) {
    this.iniciarEdicion.emit(habitacion);
  }

  // Envia el ID de la habitacion a eliminar al padre
  onDelete(id: number) {
    this.eliminarHabitacion.emit(id);
  }
}
