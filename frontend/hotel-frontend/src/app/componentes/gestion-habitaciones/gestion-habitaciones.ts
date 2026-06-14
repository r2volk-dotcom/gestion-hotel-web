import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../models';
import { HabitacionService } from '../habitaciones/habitacion.service';

// subcomponentes de gestion de habitaciones
import { GestionServicios } from './gestion-servicios/gestion-servicios';
import { GraficoHabitaciones } from './grafico-habitaciones/grafico-habitaciones';
import { GestionPromociones } from './gestion-promociones/gestion-promociones';
import { PanelHabitaciones } from './administacion-habitaciones/administacion-habitaciones';

// Decorador del componente
@Component({
  selector: 'app-gestion-habitaciones', // etiqueta HTML
  imports: [
    CommonModule,
    GestionServicios,
    GraficoHabitaciones,
    GestionPromociones,
    PanelHabitaciones
  ], // modulos y componentes importados
  templateUrl: './gestion-habitaciones.html', // plantilla HTML
  styleUrl: './gestion-habitaciones.css', // archivo de estilos
})
// Componente de la vista general de gestion de habitaciones
export class GestionHabitaciones implements OnInit {
  // Lista de habitaciones
  habitaciones: Habitacion[] = [];

  // Inyecta detector de cambios
  constructor(
    private habitacionService: HabitacionService,
    private cdr: ChangeDetectorRef
  ) {}

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarHabitaciones(); // carga inicial de habitaciones
  }

  // Carga todas las habitaciones del servidor

  async cargarHabitaciones() {
    this.habitaciones = await this.habitacionService.obtenerHabitaciones();
    this.cdr.detectChanges();
  }

  // Actualiza la vista cuando cambian las promociones
  actualizarPromociones() {
    this.cdr.detectChanges();
  }
}
