// Importa Component, OnInit y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa la interfaz Habitacion
import { Habitacion } from '../../models';
// Importa la URL base del backend
import { API_BASE_URL } from '../../api.config';
// Importa los subcomponentes de gestion de habitaciones
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
  constructor(private cdr: ChangeDetectorRef) {}

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarHabitaciones(); // carga inicial de habitaciones
  }

  // Carga todas las habitaciones del servidor
  async cargarHabitaciones() {
    // Peticion HTTP GET
    const respuesta = await fetch(`${API_BASE_URL}/habitaciones`);
    // Convierte respuesta a JSON
    const datos = await respuesta.json();
    // Asigna habitaciones
    this.habitaciones = datos;
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }
}
