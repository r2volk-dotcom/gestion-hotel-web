import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../models';
import { API_BASE_URL } from '../../api.config';
import { GestionServicios } from './componentes/gestion-servicios/gestion-servicios';
import { GraficoHabitaciones } from './componentes/grafico-habitaciones/grafico-habitaciones';
import { GestionPromociones } from './componentes/gestion-promociones/gestion-promociones';
import { PanelHabitaciones } from './componentes/panel-habitaciones/panel-habitaciones';

@Component({
  selector: 'app-gestion-habitaciones',
  imports: [
    CommonModule,
    GestionServicios,
    GraficoHabitaciones,
    GestionPromociones,
    PanelHabitaciones
  ],
  templateUrl: './gestion-habitaciones.html',
  styleUrl: './gestion-habitaciones.css',
})
export class GestionHabitaciones implements OnInit {
  habitaciones: Habitacion[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.cargarHabitaciones();
  }

  async cargarHabitaciones() {
    const respuesta = await fetch(`${API_BASE_URL}/habitaciones`);
    const datos = await respuesta.json();
    this.habitaciones = datos;
    this.cdr.detectChanges();
  }
}
